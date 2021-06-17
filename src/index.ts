import { Request, Response } from 'express';
import express = require('express')
import bodyParser = require('body-parser');
import { GetFromProvider } from './GetFromProvider/Provider'
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
        const result: Promise<any> = provider.getDataFromProviders(providerRequest.provider)
        result.then(data => {
            for (let items of data) {
                console.log(items);
            }
            response.status(200).send("👍");
        }).catch(error => {
            console.log("error")
            response.status(400).send("👎 ");
        })
    } else {
        console.error("Bad Request")
        response.status(400).send("👎 Invalid Request please use this format:" + JSON.stringify({
            "provider": '[""]',
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
        console.error("couldn't send providers back");
        return false;
    }
}
