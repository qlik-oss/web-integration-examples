const url = new URL(location.href);

// this should correspond to the Qlik Cloud tenant URL:
const tenantUrl = url.searchParams.get('tenant') || 'https://your-tenant-url-here';

// this should correspond to an web integration id that:
// 1) exists in the `tenantUrl` above (create a new one using Management Console -> Integrations)
// 2) has the domain for this mashup in its whitelisted domain
const webIntegrationId = url.searchParams.get('wiid') || 'web-integration-id-here';

// should be Helpdesk Management resourceId:
const appId = url.searchParams.get('app') || 'app-id-here';

const tenant = new URL(tenantUrl);

module.exports = {
  host: tenant.hostname,
  port: tenant.port || 443,
  isSecure: true,
  prefix: '/',
  webIntegrationId,
  appId,
};
