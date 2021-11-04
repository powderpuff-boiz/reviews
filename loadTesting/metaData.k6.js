import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 0 },
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '30s', target: 20 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  let randomId = Math.floor(Math.random() * (576000 - 1 + 1) + 1)
  const res = http.get(`http://localhost:3001/metaData?product_id=${randomId}`,
    { tags: { name: 'getMetaData' } });
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}