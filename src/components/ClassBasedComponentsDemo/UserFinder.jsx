/*import { Fragment, useState, useEffect } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};

export default UserFinder;
*/


import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import ErrorBoundary from './ErrorBoundary';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  // Initializing state.
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    };
  }

  // Runs only once.
  componentDidMount () {
    // Send an Http request to get the users list for example.
    this.setState({filteredUsers: DUMMY_USERS});
  }

  // Equivalent of useEffect() to update the component when the searchTerm changes.
  componentDidUpdate(prevProps, prevState) {
    // Preventing infinite loop to call the update only when there is a change in the searchTerm.
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({filteredUsers: DUMMY_USERS.filter((user) => user.name.includes(this.state.searchTerm))});
    }
  }

  // Defining searchChangeHandler.
  searchChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  }

  // Copying return to Render method and updating props with this.state and the binding the function with this.
  render () {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          {/* Wrapping Users with ErrorBoundary to prevent the error crashing
          of the app in the componentDidUpdate(). */}
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;

