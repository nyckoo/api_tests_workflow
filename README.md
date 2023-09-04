# Postman tests pipeline
Postman test collection integrated into Github Actions pipeline.

## About
This project involves typical CI/CD workflow that starts from branch push or a schedule following automatic api tests and ending on sending summary to slack channel. Moreover it composes of:
- [gorest.co.in](https://gorest.co.in/) Public API
- REST + GraphQL
- Github Actions workflow

## Brief API description
The API has simple structure that assumes handling notes around internet forum, having:
- new users creation
- users' posts
- posts' comments
- users' todos

## Tests Requirements
Although these tests are being developed for existing API, I invented a couple of requirements for the case of this project:
- API can be consumed only with authorized access by token
- every endpoint needs to have JSON object response format
- user has an access only to his data resource and cannot view other users' records
- status codes are standardized (more info on the site)
- responses' contents are checked as to their format with json schema specification
- each API response shouldn't take longer than 1200ms

Test collection requests are ordered in folders with following pattern both for REST and GraphQL endpoints:
- create resources
- get resources
- modify/delete resources

## Next Stage
There is going to be implementation of load testing for this API with adjusted rate-limiting, using [k6](https://k6.io/) framework.