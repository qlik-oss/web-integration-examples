const { isSecure, host, port, webIntegrationId } = require('./config');

const baseUrl = (isSecure ? 'https://' : 'http://') + host + (port ? ':' + port : '');

const _deserialize = response => (response.status !== 200 ? false : response.json());

/**
 * Helper method for making requests
 * @param {string} url - path of the api endpoint, ex: `/api/v1/items`
 * @param {string} [method='GET'] - *GET, POST, PUT, DELETE, etc.
 * @param {string|object} [payload=null] - data sent with request
 */
function _request(url, method = 'GET', payload = null) {
  return fetch(baseUrl + url, {
    method: method,
    mode: 'cors', // cors must be enabled
    credentials: 'include', // credentials must be included
    headers: {
      'Content-Type': 'application/json',
      'qlik-web-integration-id': webIntegrationId, // needed in order to whitelist your domain
    },
    body: payload
  });
}
/**
 * fetching user information from users API
 * @return Promise<Object> - result, from Response, of parsing the body text as JSON
 */
function getUser() {
  return _request('/api/v1/users/me').then(_deserialize);
}
/**
 * fetching tenant information from tenant API
 * @return Promise<Object> - result, from Response, of parsing the body text as JSON
 */
function getTenant() {
  return _request('/api/v1/tenants/me').then(_deserialize);
}

/**
 * fetching the app list from the collections API
 * @return Promise<Object> - result, from Response, of parsing the body text as JSON
 */
function getAppList() {
  return _request('/api/v1/items?limit=40').then(_deserialize);
}

module.exports = {
  getUser,
  getTenant,
  getAppList,
  baseUrl
};
