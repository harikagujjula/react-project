import { Component } from 'react';
// import { useState } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  // Initializing state in class based components.
  constructor() {
    super();
    this.state={
      showUsers: true,
    };
  }
  // Defining other methods.
  toggleUsersHandler () {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers};
    });
  }

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      // This error could crash the app, so we can use ErrorBoundary to catch this error.
      throw new Error('No users provided!');
    }
  }

  render () {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );

  }
}
// Making use of data passed by props.
// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ];

// Commenting Functional Component to convert to Class Component.
// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (

//   );
// };

export default Users;
