// export const httpGet = (url) => {};

export const httpPost = (url, body, timeout = 300) => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const fetchTimeout = new Promise((resolve, reject) => {
    setTimeout(reject, timeout, { timeout: true });
  });
  const options = { headers: { 'content-type': 'application/json' }, body, method: 'post', signal };

  return Promise.race<any>([fetch(url, options), fetchTimeout])
    .then((res) => res.status !== 200 && { error: res.status })
    .catch((err) => {
      err.timeout && abortController.abort();
      return { error: err.timeout ? 'Timeout' : err };
    });
};
