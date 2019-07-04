import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;
    const { children } = this.props;
    if (error && error.status === 401) location.reload();
    if (error) return (<pre><code>{error.stack}\n{info && info.componentStack}</code></pre>);
    return children;
  }
}
