import { Request, Response } from 'express';
import express = require('express')
import bodyParser = require('body-parser');
import { GetFromProvider } from '../src/GetFromProvider/Provider'
import { MongoDBD } from '../src/DataBase/MongoDB'
import { ProviderRequest } from '../src/Models/ProviderRequest';
import axiosHTTP from './common';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

const port = 8000 || 9000;
const provider = new GetFromProvider;
const mongodb = new MongoDBD

app.listen(port, () => {
    mongodb.setupDb();
    return console.log(`server is listening on http://localhost:${port}`);
});

app.on('error', function (e) {
    console.log(e);
});

app.get('/', (request: Request, response: Response) => {
    response.send('Hello and welcome');
});

app.post('/', async (request: Request, response: Response) => {
    const providerRequest: ProviderRequest = request.body;
    console.log('Request :', JSON.stringify(providerRequest));
    if (providerRequest.provider && providerRequest.callbackUrl) {
        const result = provider.getDataFromProviders(providerRequest.provider)
        console.log(JSON.stringify(result))
        response.status(200).send("👍");
    } else {
        console.error("Bad Request")
        response.status(400).send("👎 Invalid Request please use this format:" + JSON.stringify({
            "provider": "",
            "callbackUrl": ""
        }));
    }
})

async function sendToCallBackURL(callBackURL: string, data: any) {
    try {
        const responce = await axiosHTTP.post(callBackURL, data);
        if (responce.status == 200) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        
    }
}
