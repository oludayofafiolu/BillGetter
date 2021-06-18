import { Request, Response } from 'express';
import express = require('express')
import bodyParser = require('body-parser');
import { GetFromProvider } from './GetFromProvider/Provider'
import { ProviderRequest } from '../src/Models/ProviderRequest';
import axiosHTTP from './common';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

const port = 8000;
const provider = new GetFromProvider;

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
})

app.on('error', function (e) {
    console.log(e);
});

app.get('/', (request: Request, response: Response) => {
    response.send('Hello and welcome').status(200);
})

// app.post('/data', (request: Request, response: Response) => {
//     console.log("data received:");
//     request.body.forEach((element: any) => {
//         console.log(element)
//     });
//     response.send('Thanks for the data').status(200);
// });

app.post('/', async (request: Request, response: Response) => {
    const providerRequest: ProviderRequest = request.body;
    console.log('Request :', JSON.stringify(providerRequest));
    if (providerRequest.provider && providerRequest.callbackUrl) {
        const result = provider.getDataFromProviders(providerRequest.provider)
        result.then(async data => {
            const sentToCallBackURL = await sendToCallBackURL(providerRequest.callbackUrl, data)
            if (sentToCallBackURL) {
                response.status(200).send("👍 Data collected successfull and set to: "+ providerRequest.callbackUrl);
            } else {
                response.status(200).send("👍 Data collected successfull but, not send to " + providerRequest.callbackUrl + "👎");
            }
        }).catch(error => {
            response.status(400).send("👎 No Data from providers");
        })
    } else {
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


module.exports = app;
