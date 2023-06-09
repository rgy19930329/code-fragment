fetch({
  url: '/api/xxx',
  method: 'post',
  data: {
    bid: 'xxxx',
  },
});

get(url, { bid: 'xxxx' });

post(url, { bid: 'xxxx' });

// ============================ //

fetchFile({
  url: '/api/xxx',
  method: 'get',
  data: {
    bid: 'xxxx',
  },
  responseType: 'blob',
}).then((response) => {
  console.log('response', response);
  const data = response.data;
  const content_disposition = response.headers['content-disposition'];
  const name = decodeURI(content_disposition.match(/filename=(.*)\.\w+/))?.[1];
  downloadFile(data, name);
});
