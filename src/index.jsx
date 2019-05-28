require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { configure } from 'axios-hooks';

import './index.css';
import ErrorBoundary from './error-boundary';
import Account from './account';

const url = new URL(location.href);

// this should correspond to the QCS tenant URL, or QSE on Kubernetes deployment:
const tenantUrl = url.searchParams.get('tenant') || 'https://elastic.example';

// this should correspond to an web integration id that:
// 1) exists in the `tenantUrl` above (create a new one using Management Console -> Integrations)
// 2) has the domain for this web app in its whitelisted domain
const webIntegrationId = url.searchParams.get('wiid') || 'pFgisqzsUcy8k47jNKJA01ru6P7SUig9';

// configures the REST library with the appropriate tenant-specific settings:
// * tenantUrl as a base for all requests
// * qlik-web-integration-url header
// * qlik-csrf-token header (TODO), required for non-GET requests
configure({
  axios: Axios.create({
    baseURL: `${tenantUrl}/api`,
    withCredentials: true,
    headers: {
      'qlik-web-integration-id': webIntegrationId,
      'content-type': 'application/json',
    },
  }),
});

const Index = () => (
  <ErrorBoundary>
    <Account tenantUrl={tenantUrl} webIntegrationId={webIntegrationId} />
    <p>Some other web app content could go here.</p>
  </ErrorBoundary>
);

ReactDOM.render(<Index />, document.getElementById('app'));

if (module.hot) {
  // used for hot module replacement during development:
  module.hot.accept();
}