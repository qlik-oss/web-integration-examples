const { isSecure, host, port, webIntegrationId } = require('./config');

const baseUrl = (isSecure ? 'https://' : 'http://') + host + (port ? ':' + port : '');

const _deserialize = (response) => (response.status !== 200 ? false : response.json());

/**
 * Helper method for making requests
 * @param {string} url - path of the api endpoint, ex: `/api/v1/items`
 * @param {string} [method='GET'] - *GET, POST, PUT, DELETE, etc.
 * @param {string|object} [payload=null] - data sent with request
 */
function _request(url, method = 'GET', payload = null) {
  return fetch(baseUrl + url, {
    method: method,
    mode: 'no-cors', // cors must be enabled
    credentials: '*same-origin', // credentials must be included
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
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
function getAppList(filter) {
  return _request(`/api/v1/items?limit=40${filter ? '&query=' + filter : ''}`).then(_deserialize);
}

/**
 * fetching the file represented with the url given in input
 * @param url
 * @returns {Promise<Blob>} - result, from Response, a promise that will fulfill with a new Blob object.
 */
function getFileContent(url) {
  return fetch(url, {
    method: 'GET',
    mode: 'no-cors', // cors must be enabled
    credentials: '*same-origin', // credentials must be included
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.blob());
}

module.exports = {
  getUser,
  getTenant,
  getAppList,
  getFileContent,
  baseUrl,
};
