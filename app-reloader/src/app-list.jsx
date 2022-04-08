import React, { useEffect } from 'react';

import './app-list.css';
import useBackend from './use-backend';

// simple component to render reload status:
const ReloadStatus = ({ appId, execute }) => {
  const [reloads, reloadsError, reloadsIsLoading, refresh] = useBackend({ url: `/v1/reloads?appId=${appId}` });
  if (reloadsIsLoading) return (<p>Loading...</p>);
  if (reloadsError) return (<p>Cannot load reload status, possible permission issue</p>);
  const latest = reloads.data[0];
  if (!latest) return (<p>Unknown status (never reloaded?)</p>);
  return (<p>{latest.status}{latest.endTime ? `, ${new Date(latest.endTime).toISOString()}` : ''}</p>);
};

// simple component to render an app list row with actions:
const AppListRow = ({ tenantUrl, app, reloads, executeReload }) => (
  <tr key={app.id}>
    <td><a href={`${tenantUrl}/sense/app/${app.resourceId}`} target="_blank">{app.resourceId}</a></td>
    <td>{app.name}</td>
    <td><ReloadStatus appId={app.resourceId} reloads={reloads} /></td>
    <td>{app.actions.indexOf('reload') > -1
      ? (<button onClick={() => executeReload({ data: { appId: app.resourceId } })}>Reload</button>)
      : 'No permission to reload'
    }</td>
  </tr>
);

export default function AppList({ tenantUrl, userId }) {
  // fetch app list:
  const [apps, appsError, appsIsLoading] = useBackend({ url: `/v1/items?type=app&sort=-createdAt&createdByUserId=${userId}` });
  const [, , , executeReload] = useBackend({ url: '/v1/reloads', method: 'POST', manual: true });
  const render = c => (<section className="app-list">{c}</section>);

  // apps errors are handled higher up in the stack (error-boundary):
  if (appsError) throw appsError;
  if (appsIsLoading) return render(<p>Loading...</p>);

  return render(
    <React.Fragment>
      <h1>App list</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Current Status</th><th></th></tr>
        </thead>
        <tbody>
          {apps.data.map(a => <AppListRow
            tenantUrl={tenantUrl}
            app={a}
            executeReload={executeReload}
          />)}
        </tbody>
      </table>
    </React.Fragment>
  );
}
