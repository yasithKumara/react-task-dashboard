import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.error('Error caught by error boundary:', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
