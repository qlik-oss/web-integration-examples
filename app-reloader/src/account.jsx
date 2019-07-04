import React from 'react';

import useBackend from './use-backend';

export default function Account({ tenantUrl }) {
  // fetch user & tenant information async:
  const [user, userError, userIsLoading] = useBackend({ url: '/v1/users/me' });
  const [tenant, tenantError, tenantIsLoading] = useBackend({ url: '/v1/tenants/me' });
  const render = c => (<section className="account">{c}</section>);
  const url = new URL(`${tenantUrl}/logout`);

  if (userError || tenantError) throw userError || anError;
  if (userIsLoading || tenantIsLoading) return render(<p>Loading...</p>);

  return render(
    <React.Fragment>
      <p>
        Welcome back, <span><code>{user.name}</code> </span>
        from tenant <span><code>{tenant.name}</code></span>.
        {' '} <a href={url}>Log out from {url.hostname}</a>.
      </p>
    </React.Fragment>
  );
}
