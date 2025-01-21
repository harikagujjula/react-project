import classes from './User.module.css';
import { Component } from 'react';

// Class is not a React component, it is a JavaScript class.
class User extends Component{
  // Before the component is removed from DOM.
  componentWillUnmount () {
    console.log('User will unmount');
  }

  /* Can have any number of user defined methods, but should have a render method
    which is equivalent to return in functional components.

    render method do not accept props as argument, instead it is accessed using
    this.props when we extend Component class.
    */
  render () {
      return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
