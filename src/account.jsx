import React from 'react';

import useBackend from './use-backend';

export default function Account({ tenantUrl, webIntegrationId }) {
  // fetch user and tenant information async:
  const [user, userError, userIsLoading] = useBackend({ url: '/v1/users/me' });
  const [tenant, tenantError, tenantIsLoading] = useBackend({ url: '/v1/tenants/me' });

  const anError = userError || tenantError;
  const render = c => (<section className="account">{c}</section>);

  if (anError) {
    if (!anError.response || anError.response.status !== 401) {
      // we only handle errors related to access denied (HTTP 401):
      throw anError;
    }
    // build a single-sign on URL and return back here once completed:
    const url = new URL(`${tenantUrl}/login`);
    url.searchParams.append('returnto', location.href);
    url.searchParams.append('qlik-web-integration-id', webIntegrationId);
    return render(
      <React.Fragment>
        <p>You are not logged in, if you previously had a session you need to login again.</p>
        <a href={url}>Login to {url.hostname}</a>
      </React.Fragment>
    );
  }

  if (userIsLoading || tenantIsLoading) return render(<p>Loading...</p>);

  const url = new URL(`${tenantUrl}/logout`);

  return render(
    <React.Fragment>
      <p>
        Welcome back, <span><code>{user.name}</code> </span>
        from tenant <span><code>{tenant.name}</code></span>
      </p>
      <a href={url}>Log out from {url.hostname}</a>
    </React.Fragment>
  );
}
