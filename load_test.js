import http from 'k6/http';
import { BASE_URL, USERNAME, EMAIL, HEADERS, randomString, randomFutureDatetimeISO } from './test_config_data';

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
  group('Create user todo', () => {
    const payload = JSON.stringify({
      title: randomString(10),
      due_on: randomFutureDatetimeISO(60000),
      status: 'pending'
    });

    const res = http.post(`${BASE_URL}/users/${id}/todos`, payload, { HEADERS });

    if (!check(res, { 'Todo created': (r) => r.status === 201 })) {
      console.log(`Couldn't create todo: ${res.status} ${res.body}`);
      return;
    }
  });

  group('Create user post & comment', () => {
    let postID = '';
    group('Create post', () => {
      const payload = {
        title: randomString(10),
        body: randomString(16)
      };

      const res = http.post(`${BASE_URL}/users/${id}/posts`, payload, { HEADERS });

      if (check(res, { 'Post created correctly': (r) => r.status === 201 })) {
        postID = res.json('id')
      } else {
        console.log(`Couldn't create post ${res.status} ${res.body}`);
        return;
      }
    });

    group('Create comment', () => {
      const payload = {
        name: randomString(10),
        email: randomString(8) + '@example.com',
        body: randomString(10)
      };
      const res = http.post(`${BASE_URL}/posts/${postID}/comments`, payload, { HEADERS });

      if (!check(res, { 'Comment created correctly': () => res.status === 201 })) {
        console.log(`Couldn't create comment ${res.status} ${res.body}`);
        return;
      }
    });

    const delRes = http.del(`${BASE_URL}/users/${id}`, null, { HEADERS });

    const isSuccessfulDelete = check(null, {
      'User deleted successfully': () => delRes.status === 204,
    });

    if (!isSuccessfulDelete) {
      console.log(`User was not deleted properly`);
      return;
    }
  });

  sleep(1);
}
