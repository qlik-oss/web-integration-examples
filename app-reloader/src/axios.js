import Axios from 'axios';
import { configure } from 'axios-hooks';
import { setupCache } from 'axios-cache-adapter';

export default function bootstrap(tenantUrl, webIntegrationId) {

  // configures the REST library with the appropriate tenant-specific settings:
  // * tenantUrl as a base for all requests
  // * qlik-web-integration-url header
  const axiosInstance = Axios.create({
    baseURL: `${tenantUrl}/api`,
    withCredentials: true,
    adapter: setupCache({ maxAge: 1000 }).adapter,
    headers: {
      'qlik-web-integration-id': webIntegrationId,
      'content-type': 'application/json',
    },
  });

  let csrfToken = null;

  axiosInstance.interceptors.request.use(async (cfg) => {
    if (cfg.method !== 'get') {
      if (!csrfToken) {
        const csrf = await axiosInstance('/v1/csrf-token');
        csrfToken = csrf.headers['qlik-csrf-token'];
      }
      cfg.headers['qlik-csrf-token'] = csrfToken;
    }
    return cfg;
  });

  configure({
    axios: axiosInstance,
  });
}
