require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import bootstrap from './axios';
import ErrorBoundary from './error-boundary';
import Login from './login';
import Account from './account';
import AppList from './app-list';
import useBackend from './use-backend';

const url = new URL(location.href);

// this should correspond to the Qlik Cloud tenant URL:
const tenantUrl = url.searchParams.get('tenant') || 'https://your-tenant-url-here';

// this should correspond to an web integration id that:
// 1) exists in the `tenantUrl` above (create a new one using Management Console -> Integrations)
// 2) has the domain for this web app in its whitelisted domain
const webIntegrationId = url.searchParams.get('wiid') || 'web-integration-id-here';

// bootstrap the Axios library which is used throughout the web app to do ajax requests towards
// the Qlik backend APIs:
bootstrap(tenantUrl, webIntegrationId);

const Index = () => {
  const [user, userError, userIsLoading] = useBackend({ url: '/v1/users/me' });
  const needsLogin = userError && userError.response && userError.response.status === 401;
  let view;

  if (userIsLoading) {
    view = (<p>Loading...</p>);
  } else if (needsLogin) {
    view = <Login tenantUrl={tenantUrl} webIntegrationId={webIntegrationId} />
  } else if (userError) {
    view = (<div>Unable to fetch user, likely misconfigured tenant/web integration. <pre><code>{userError.stack}</code></pre></div>);
  } else {
    view = (
      <React.Fragment>
        <Account tenantUrl={tenantUrl} />
        <AppList tenantUrl={tenantUrl} userId={user.id} />
      </React.Fragment>
    );
  }

  return <ErrorBoundary>{view}</ErrorBoundary>;
};

ReactDOM.render(<Index />, document.getElementById('app'));

if (module.hot) {
  // used for hot module replacement during development:
  module.hot.accept();
}