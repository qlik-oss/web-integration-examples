const config = {
    host: 'elastic.example', // <- your tenant url
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'BP57eMwosZKlhGgTScXtNQEQq2hBmsYR', // needed in order to whitelist your domain
    appId: '6ca36f2e-f77d-4f1c-8e22-3e02bd703ca1', // <- should be Helpdesk Management resourceId
  };
  define([], function(){
    return config;
  });