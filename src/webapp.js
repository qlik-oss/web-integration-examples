require('babel-polyfill');

(async () => {
  const tenantUrl = 'https://elastic.example/api';
  const webIntegrationId = 'pFgisqzsUcy8k47jNKJA01ru6P7SUig9';

  const req = (url = '', method = 'get', body = null) => fetch(url, {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'qlik-web-integration-id': webIntegrationId,
      'content-type': 'application/json',
    },
    body,
  }).then(r => r.json());

  const doRequest = async (...params) => {
    const section = document.createElement('section');
    const header = document.createElement('h1');
    const code = document.createElement('code');
    const pre = document.createElement('pre');
    section.appendChild(header);
    section.appendChild(code);
    code.appendChild(pre);
    document.documentElement.appendChild(section);
    header.textContent = params[0];
    pre.textContent = `Fetching ${params[0]}...`;

    try {
      const result = await req(...params);
      pre.textContent = JSON.stringify(result, null, '  ');
    } catch (error) {
      pre.textContent = `Failed to fetch ${params[0]}: ${error}`;
    }
  };

  doRequest(`${tenantUrl}/v1/users/me`);
  doRequest(`${tenantUrl}/v1/tenants/me`);
  doRequest(`${tenantUrl}/v1/audits`);  
})();
