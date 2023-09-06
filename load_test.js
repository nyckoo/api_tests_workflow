import http from 'k6/http';
import { BASE_URL, USERNAME, EMAIL, HEADERS } from './test_config_data';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
    delay
  },
  scenarios: {
    constant_arrival_scenario: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      preAllocatedVUs: 50,
      rate: 50,
      timeUnit: '1s',
    },
  },
};

export function setup() {
  const res = http.post(`${BASE_URL}/users`, {
    "name": USERNAME,
    "email": EMAIL,
    "gender": "male",
    "status": "active"
  }, { HEADERS });

  check(res, { 'User created': (r) => r.status === 201 });

  return res.json('id');
}

export default (id) => {
  const createTodosPayload = JSON.stringify({
    title: '{{$randomAdjective}} {{$randomBs}}',
    due_on: '{{$randomDateFuture}}',
    status: '{{status}}'
  });

  const createTodosRes = http.post(`${BASE_URL}/users/${id}/todos`, createTodosPayload, { HEADERS });

  check(createTodosRes, { 'status code is 200': (r) => r.status === 200 });
}
