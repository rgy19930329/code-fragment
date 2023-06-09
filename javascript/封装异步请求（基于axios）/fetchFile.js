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

const fetchFile = (opts, data) => {
  const defaultOpts = {
    method: 'get',
    responseType: 'blob',
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
  return axiosInstance(combinedOpts);
};

export default fetchFile;
