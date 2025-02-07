import { Component } from "react";
// For class based components, since hooks cannot be used, connect allows to
// subscribe to the store, get data store and update the data.
import { connect } from "react-redux";
import classes from "./URCounter.module.css";

// This is class based version of URCounter (functional component).
class URCounterClassBased extends Component {
  incrementHandler() {
    // We get this increment() prop from the mapDispatchToProps().
    this.props.increment();
  }
  decrementHandler() {
    // We get this decrement() from the mapDispatchToProps().
    this.props.decrement();
  }
  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        {/* Adding Buttons to Dispatch actions. */}
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

/* This is similar to useSelector() hook in functional components.

  - Receives redux state automatically.
  - Returns an object where the keys will be available as props in the receiving
  component(URCounterClassBased) and values of the keys is drilling into the
  Redux state.
*/
const mapStateToProps = (state) => {
  return {
    // counter key will be available as prop to the URCounterClassBased.
    // Value, state.counter is the value from the redux store.
    counter: state.counter,
  };
};

/* This is similar to useDispatch() hook in functional components.

  This function returns functions as props to the receiving
  component(URCounterClassBased), which when executed will dispatch the
  actions to the redux store.

  - Receives dispatch function as argument automatically.
  - Returns an object where keys are prop names(that are available to the component)
    and values are functions in which we call dispatch to setup our action.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    // increment, decrement keys are props available to the component and these
    // hold functions to dispatch actions to the store.
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

/*
  For class based components, we use connect() that allows to subscribe to the
  store, get data store and update the data.

  connect() also works with Functional components, but using hooks would be easy
  to use, we prefer uusing useSelector(), useDispatch().

  We should export the component using connect() as, when connect() is executed,
  will return a new function as value and that function will be executed again
  with the component as an argument.

  Receives 2 arguments as just pointers(and will be executed by React-redux):
    - a function that maps redux state to props, which can then be used in this
      component.(mapStateToProps)
    - a function that returns functions as props to the receiving component
      (URCounterClassBased), which when executed will dispatch the
      actions to the redux store(mapDispatchToProps).
  Returns a function as a value.
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(URCounterClassBased);
