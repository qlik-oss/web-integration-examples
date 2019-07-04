import React, { useEffect } from 'react';

import './app-list.css';
import useBackend from './use-backend';

// simple component to render reload status:
const ReloadStatus = ({ appId, reloads = { data: [] }, execute }) => {
  const latest = reloads.data.find(r => r.appId);
  if (!latest) return (<p>Unknown status (never reloaded?)</p>);
  return (<p>{latest.status}{latest.endTime ? `, ${new Date(latest.endTime).toISOString()}` : ''}</p>);
};

// simple component to render an app list row with actions:
const AppListRow = ({ tenantUrl, app, reloads, executeReload }) => (
  <tr>
    <td><a href={`${tenantUrl}/sense/app/${app.resourceId}`} target="_blank">{app.resourceId}</a></td>
    <td>{app.name}</td>
    <td><ReloadStatus appId={app.resourceId} reloads={reloads} /></td>
    <td>{app.actions.indexOf('reload') > -1
      ? (<button onClick={() => executeReload({ data: { appId: app.resourceId } })}>Reload</button>)
      : 'No permission to reload'
    }</td>
  </tr>
);

export default function AppList({ tenantUrl }) {
  // fetch app list and reloads async:
  const [apps, appsError, appsIsLoading] = useBackend({ url: '/v1/items?type=app' });
  const [reloads, reloadsError, reloadsIsLoading, refresh] = useBackend({ url: '/v1/reloads' });
  const [, , , executeReload] = useBackend({ url: '/v1/reloads', method: 'POST', manual: true });
  const render = c => (<section className="app-list">{c}</section>);

  // apps and reloads errors are handled higher up in the stack (error-boundary):
  if (appsError || reloadsError) throw appsError || reloadsError;
  if (appsIsLoading) return render(<p>Loading...</p>);

  return render(
    <React.Fragment>
      <h1>App list</h1>
      <button onClick={refresh}>Refresh reload statuses</button>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Current Status</th><th></th></tr>
        </thead>
        <tbody>
          {apps.data.map(a => <AppListRow
            key={app.id}
            tenantUrl={tenantUrl}
            app={a}
            reloads={reloads}
            executeReload={executeReload}
          />)}
        </tbody>
      </table>
    </React.Fragment>
  );
}
