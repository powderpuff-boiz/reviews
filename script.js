// import http from 'k6/http';
// import { sleep } from 'k6';

// export const options = {
//   vus: 10,
//   duration: '30s',
// };
// export default function () {
//   http.get('http://localhost:3001/reviews');
//   sleep(1);
// }


import http from "k6/http";
import { sleep, check } from 'k6';
// GET
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 100,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};
export default function () {
  //let randomId = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
  // const responses = http.batch([
  //   ['GET', `http://localhost:3001/reviews?product_id=${randomId}&count=100`],
  //   ['GET', `http://localhost:3001/metaData?product_id=${randomId}`]
  // ]);
  let randomId = Math.floor(Math.random() * (10000 - 9000) + 9000);
  let res = http.get(`http://localhost:3001/metaData?product_id=${randomId}`);
  check(res, { 'is status 200': (r) => r.status === 200 })
}