const request = require("supertest");
const app  = require("../../src/index");
import mockAxios from 'axios';
import { anything, instance, mock, when } from "ts-mockito";
import { GetFromProvider } from "../../src/GetFromProvider/Provider"
import { ProviderRequest } from '../../src/Models/ProviderRequest';


describe("Test Express", () => {

  const mockedGetFromProvider: GetFromProvider = mock(GetFromProvider);
  const providerRequest: ProviderRequest = {
    provider: ["gas", "internet"],
    callbackUrl: "http://localhost:8000/data"
  }
  const returnedData = [{
    internet: [
      { billedOn: '2020-02-07T15:03:14.257Z', amount: 15.12 },
      { billedOn: '2020-03-07T15:03:14.257Z', amount: 15.12 }
    ]
  },
  {
    gas: [
      { billedOn: '2020-04-07T15:03:14.257Z', amount: 22.27 },
      { billedOn: '2020-05-07T15:03:14.257Z', amount: 30 }
    ]
  }]

  it("It should response the GET method", async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it("test post and send bad request", async () => {
    const providerRequestBad = {
      provider: "bad",
      callbackUr: "http://localhost:8000/data"
    }
    const response = await request(app).post('/').send(providerRequestBad);
    expect(response.statusCode).toBe(400)
  })

  it("test post and return success data", async () => {
    const response = await request(app).post('/').send(providerRequest);
    when(mockedGetFromProvider.getDataFromProviders(providerRequest.provider)).thenResolve(returnedData[0])
    expect(response.statusCode).toBe(200)
  })

  
});
