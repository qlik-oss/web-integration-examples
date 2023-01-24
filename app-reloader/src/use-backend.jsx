import React from 'react';

import useAxios from 'axios-hooks';

// React hook that simplifies communication with a
// Qlik Cloud tenant.
// `url` is a path to the API endpoint, e.g. /v1/users/me
export default function ({ url = '/', method = 'get', data = null, manual = false }) {
  const [{ data: resData, error, loading }, execute] = useAxios({
    url,
    method,
    data,
  }, { manual });
  return [resData, error, loading, execute];
};
