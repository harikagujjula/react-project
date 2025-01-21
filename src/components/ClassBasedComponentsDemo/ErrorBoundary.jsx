import { Component } from "react";

class ErrorBoundary extends Component {
  constructor () {
    super();
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  componentDidCatch (error) {
    // Can do anything when we see an error.
    this.setState({
      hasError: !this.state.hasError,
      errorMessage: "Something went wrong!"
    });
  }

  render () {
    if (this.state.hasError) {
      return <p>{this.state.errorMessage}</p>;
    }
    // As we are wrapping ErrorBoundary component around the component which
    // might throw an error and we are trying to protect.
    return this.props.children;
  }
}

export default ErrorBoundary;
