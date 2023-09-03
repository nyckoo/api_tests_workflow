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

Test collection requests are ordered in following pattern both for REST and GraphQL endpoints:
- create resources
- get resources
- modify resources

## Next Stage
There is going to be implementation of load testing conducted locally, using [k6](https://k6.io/) with an examplary API from this site.
