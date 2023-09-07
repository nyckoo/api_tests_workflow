# Postman tests pipeline
Postman test collection integrated into Github Actions pipeline.

## About
This project involves typical CI/CD workflow that starts from branch push or a schedule following automatic api tests and ending on sending summary to Slack channel. Moreover it composes of:
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
#### Functional (Postman):
- API can be consumed only with authorized access by token
- every endpoint needs to have JSON object response format
- user has an access only to his data resource and cannot view other users' records
- status codes are standardized (more info on the site)
- responses' contents are checked as to their format with json schema specification
#### Performance (k6):
- On average responses are coming within 350ms
- 90th percentile of response time is within 450ms
- min. 99% of status codes are correct
- max. 1% of requests can fail
- 5 requests per sec (300 requests/min rate-limit)

Postman test collection requests are ordered in folders with following pattern both for REST and GraphQL endpoints:
- create resources
- get resources
- modify/delete resources

Load tests are designed with following structure having 100 iterations of test suite:
- create test user once
- create user's todo
- create user's post
- create post's comment
- delete test user once

## Exemplary output files from tests:
postman functional testing:
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
k6 load testing:
```
{
    "metrics": {
        "http_req_receiving": {
            "avg": 0.08909623178807943,
            "min": 0.0402,
            "med": 0.0711505,
            "max": 2.434108,
            "p(90)": 0.11261090000000007,
            "p(95)": 0.13004595
        },
        "group_duration": {
            "avg": 470.94266486749984,
            "min": 290.074709,
            "med": 333.655332,
            "max": 2264.176542,
            "p(90)": 773.8178386,
            "p(95)": 937.2741952
        },
        "iteration_duration": {
            "avg": 2165.365420686275,
            "min": 884.796091,
            "med": 1990.3343765,
            "max": 3949.568196,
            "p(90)": 2723.111838800001,
            "p(95)": 3033.0894196999984
        },
        "http_req_sending": {
            "med": 0.10464999999999999,
            "max": 1.085003,
            "p(90)": 0.15586090000000002,
            "p(95)": 0.19286094999999998,
            "avg": 0.11958804304635749,
            "min": 0.0684
        },
        "vus": {
            "min": 0,
            "max": 15,
            "value": 0
        },
        "data_received": {
            "count": 242354,
            "rate": 12881.562450763602
        },
        "http_req_tls_handshaking": {
            "p(90)": 0,
            "p(95)": 7.353268849999989,
            "avg": 0.6165068509933774,
            "min": 0,
            "med": 0,
            "max": 17.607655
        },
        "http_req_duration{expected_response:true}": {
            "avg": 398.788830023179,
            "min": 289.625107,
            "med": 317.745566,
            "max": 2506.80739,
            "p(90)": 595.2668039,
            "p(95)": 865.0729589499999
        },
        "data_sent": {
            "count": 50781,
            "rate": 2699.103884450954
        },
        "http_reqs": {
            "count": 302,
            "rate": 16.051857448734527
        },
        "http_req_blocked": {
            "p(90)": 0.0009,
            "p(95)": 9.448669949999996,
            "avg": 0.809376639072843,
            "min": 0.0004,
            "med": 0.0006,
            "max": 20.266064
        },
        "vus_max": {
            "value": 15,
            "min": 15,
            "max": 15
        },
        "checks": {
            "passes": 302,
            "fails": 0,
            "thresholds": {
                "rate>0.99": false
            },
            "value": 1
        },
        "http_req_failed": {
            "fails": 302,
            "passes": 0,
            "thresholds": {
                "rate<0.01": false
            },
            "value": 0
        },
        "http_req_connecting": {
            "max": 4.618214,
            "p(90)": 0,
            "p(95)": 1.843900049999999,
            "avg": 0.1526961523178808,
            "min": 0,
            "med": 0
        },
        "iterations": {
            "count": 100,
            "rate": 5.315184585673685
        },
        "http_req_waiting": {
            "p(90)": 595.0966430000001,
            "p(95)": 864.7046519999999,
            "avg": 398.5801457483443,
            "min": 289.329807,
            "med": 317.561416,
            "max": 2506.60059
        },
        "http_req_duration": {
            "avg": 398.788830023179,
            "min": 289.625107,
            "med": 317.745566,
            "max": 2506.80739,
            "p(90)": 595.2668039,
            "p(95)": 865.0729589499999,
            "thresholds": {
                "p(90)<450": true,
                "avg<350": true
            }
        }
    }, ...
}
```
