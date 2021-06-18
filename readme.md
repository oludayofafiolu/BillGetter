###

To use first run

`git clone https://bitbucket.org/wonderbill/datahog.git && npm install + npm run start`

Once the Server is running, run `npm install && npm run build:start`

Once server is running, you can send a request using postman or curl

Postman:

POST `http://localhost:8000` 

Body 
```
{
    "provider" : ["internet", "gas"],
    "callbackUrl" : "http://localhost:8000/data"
}
```

CURL

`curl --location --request POST 'http://localhost:8000' --header 'Content-Type: application/json' --data-raw '{"provider" : ["internet", "gas"],"callbackUrl" : "http://localhost:8000/data"}'`


Notes:

- I fun doing this work its very rarely that i get to do work from scratch
- Once a successful request has been made the application stores the last success request and resend is if a new request fails
- If the first request is unsuccessful then nothing is returned to the callbackURL
- The last request would be stored in a database but I don't have a lot of experience using MongoDB 
- I had a hard time with some of the test
