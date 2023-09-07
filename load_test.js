import http from 'k6/http';
import { check, group, sleep } from 'k6';

import { BASE_URL, USERNAME, EMAIL, HEADERS, randomString, randomFutureDatetimeISO } from './test_config_data.js';

export const options = {
  thresholds: {
    checks: ['rate>0.95'],
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<450', 'avg<300'],
  },
  scenarios: {
    shared_iterations_scenario: {
      executor: 'shared-iterations',
      gracefulStop: '0s',
      vus: 1,
      iterations: 1,
      maxDuration: '5s',
    },
  },
};

export function setup() {
  const res = http.post(`${BASE_URL}/users`, {
    name: USERNAME,
    email: EMAIL,
    gender: 'male',
    status: 'active'
  }, { HEADERS });

  check(res, { 'User created': () => res.status === 201 });

  return res.json('id');
}

export default (id) => {
  group('Create user todo', () => {
    const payload = JSON.stringify({
      title: randomString(10),
      due_on: randomFutureDatetimeISO(60000000),
      status: 'pending'
    });

    const res = http.post(`${BASE_URL}/users/${id}/todos`, payload, { HEADERS });

    if (!check(res, { 'Todo created': () => res.status === 201 })) {
      console.log(`Couldn't create todo: ${res.status} ${res.error}`);
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

      if (check(res, { 'Post created correctly': () => res.status === 201 })) {
        postID = res.json('id')
      } else {
        console.log(`Couldn't create post ${res.status} ${res.error}`);
        return;
      }
    });

    group('Create comment', () => {
      const payload = {
        name: randomString(10),
        email: `${randomString(8)}@example.com`,
        body: randomString(10)
      };
      const res = http.post(`${BASE_URL}/posts/${postID}/comments`, payload, { HEADERS });

      if (!check(res, { 'Comment created correctly': () => res.status === 201 })) {
        console.log(`Couldn't create comment ${res.status} ${res.error}`);
        return;
      }
    });
  });

  sleep(1);
}

export function teardown(id) {
  const delRes = http.del(`${BASE_URL}/users/${id}`, null, { HEADERS });

  const isSuccessfulDelete = check(null, {
    'User deleted successfully': () => delRes.status === 204,
  });

  if (!isSuccessfulDelete) {
    console.log(`User was not deleted properly ${delRes.status} ${delRes.error}`);
    return;
  }
}
