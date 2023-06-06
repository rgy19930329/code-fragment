import axios from 'axios';

const axiosInstance = axios.create();

function getHeaders(headers = {}) {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    ...headrs,
    // ...
  };
}

const fetch = (opts, data) => {
  const defaultOpts = {
    method: 'get',
    responseType: 'json',
    timeout: 60 * 1000, // 默认60s
    headers: getHeaders(opts.headers),
    validateStatus: (status) => status > 200,
  };

  let combinedOpts = {};

  if (typeof opts === 'string') {
    combinedOpts = {
      ...defaultOpts,
      url: opts,
    };
    combinedOpts.params = data;
  } else {
    combinedOpts = {
      ...defaultOpts,
      ...opts,
      headers: getHeaders(opts.headers),
    };
    const { method, data } = combinedOpts;
    if (method?.toLowerCase() === 'get') {
      combinedOpts.params = data;
    }
  }
  return axiosInstance(combinedOpts).then((response) => response.data);
};

const get = (url, data) => {
  return fetch(url, data);
};

const post = (url, data) => {
  return fetch(
    {
      url,
      method: 'post',
      data,
    },
    null
  );
};

fetch.get = get;
fetch.post = post;

export default fetch;
