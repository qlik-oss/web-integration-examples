import React from 'react';

// error boundaries are high-level components that catches errors thrown
// by child components and presents them to the user or send them to backend
// log services.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;
    const { children } = this.props;
    if (error) return (<pre><code>{error.stack}\n{info.componentStack}</code></pre>);
    return children;
  }
}
