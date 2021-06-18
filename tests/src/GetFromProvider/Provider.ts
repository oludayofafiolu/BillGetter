import axios from 'axios';
import mockAxios from 'axios'
import {instance, mock, when} from "ts-mockito";

describe('Test for axios instance creation', () => {

    const dataResolved = [
        {
            "billedOn": "2020-04-07T15:03:14.257Z",
            "amount": 22.27
        },
        {
            "billedOn": "2020-05-07T15:03:14.257Z",
            "amount": 30.00
        }
    ]
    jest.mock("axios", () => {
        return {
            create: jest.fn(() => axios),
            get: jest.fn(() => Promise.resolve(dataResolved)),
        };
    });
    
    it("", () => {
        
    })
    
})
