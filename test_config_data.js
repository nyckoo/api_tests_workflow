export function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
};

export function randomFutureDatetimeISO(miliseconds) {
    return new Date(Date.now() + Math.floor(Math.random() * miliseconds)).toISOString();
}

export const BASE_URL = 'https://gorest.co.in/public/v2';
export const USERNAME = 'Test Name'
export const EMAIL = `${randomString(10)}@example.com`;

export const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${__ENV.TOKEN}`
};