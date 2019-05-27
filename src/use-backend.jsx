import React, { useState, useEffect } from 'react';

import useAxios from 'axios-hooks';

// React hook that simplifies communication with a
// QCS tenant or QSE on Kubernetes deployment.
// `url` is a path to the API endpoint, e.g. /v1/users/me
export default function ({ url = '/', method = 'get', body = null }) {
  const [{ data, error, loading }, refetch] = useAxios({
    url,
    method,
    data: body,
  });
  return [data, error, loading];
};
