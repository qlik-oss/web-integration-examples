import React from 'react';

export default function Login({ tenantUrl, webIntegrationId }) {
  // build a single-sign on URL and return back here once completed:
  const url = new URL(`${tenantUrl}/login`);
  url.searchParams.append('returnto', location.href);
  url.searchParams.append('qlik-web-integration-id', webIntegrationId);
  return (
    <React.Fragment>
      <p>You are not logged in, if you previously had a session you need to login again.</p>
      <a href={url}>Login to {url.hostname}</a>
    </React.Fragment>
  );
};