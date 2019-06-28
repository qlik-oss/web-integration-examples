const url = new URL(location.href);

const config = {
    host: 'my-tenant.qcs.com', // <- your tenant url
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'webIntegrationId', // needed in order to whitelist your domain
    appId: 'appId', // <- should be Helpdesk Management resourceId
  };
  define([], function(){
    return config;
  });