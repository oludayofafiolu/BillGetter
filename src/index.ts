import { Request, Response, Application } from 'express';
import express = require('express')
import bodyParser = require('body-parser');
import fs = require('fs');
import { GetFromProvider } from '../src/GetFromProvider/provider'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

const port = 8000;

app.get('/', (request, response) => {
    response.send('Hello and welcome');
});

app.post('/', async (request, response) => {
    console.log('Got body:', JSON.stringify(request.body));
    if (request.body["provider"] && request.body["callBackURL"]) {
        const provider = new GetFromProvider(request.body["provider"], request.body["callBackURL"]);
        const result = provider.postToProvider()
    }
    response.sendStatus(200);
})

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
