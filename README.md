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

## Exemplary output
```
{
   "Collection":{
      "Info":{
         "Name":"gorest.co.in",
         "Id":"473acc87-5afa-4d74-869d-b96375bef800"
      }
   },
   "Run":{
      "Stats":{
         "Requests":{
            "total":20,
            "pending":0,
            "failed":0
         },
         "Assertions":{
            "total":65,
            "pending":0,
            "failed":1
         }
      },
      "Failures":[
         {
            "Parent":{
               "Name":"modify/delete resources",
               "Id":"938e1708-c0a0-4d22-b3c3-cfcef568c31b"
            },
            "Source":{
               "Name":"delete user",
               "Id":"73207aae-820b-40eb-a599-2436288b3ffb"
            },
            "Error":{
               "Message":"expected response body to be a valid json but got error No data, empty input at 1:1",
               "Test":"response type: JSON"
            }
         }
      ],
      "Timings":{
         "responseAverage":342.15,
         "responseMin":306,
         "responseMax":426,
         "responseSd":35.2537586648573,
         "dnsAverage":0,
         "dnsMin":0,
         "dnsMax":0,
         "dnsSd":0,
         "firstByteAverage":0,
         "firstByteMin":0,
         "firstByteMax":0,
         "firstByteSd":0,
         "started":1693839916070,
         "completed":1693839923782
      }
   }
}
```

## Next Stage
There is going to be implementation of load testing for this API with adjusted rate-limiting, using [k6](https://k6.io/) framework.