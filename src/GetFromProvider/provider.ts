import axiosHTTP from '../common';
import { ProviderRequest } from '../Models/ProviderRequest';
import { BillSchema } from '../Models/BillSchema';

export class GetFromProvider {
    providerPort = 3000;
    [key: string]: any;

    constructor() {}

    async getDataFromProviders(providers: [string]) {
        const allBills: any = {}
        providers.forEach((element: string) => {
            const result = this.getData(element)
            var tempArray: BillSchema[] = []
            result.then((data) => {
                data.forEach((payment: BillSchema) => {
                    tempArray.push(payment)
                });
                console.log(element)
                console.log(tempArray)
        
            }).catch((err) => {
                console.error(err)
            })
        });
        return allBills;
    }

    async getData(bill: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const responce = await axiosHTTP.get(`http://localhost:${this.providerPort}/providers/${bill}`)
                if (responce.status == 200) {
                    resolve(responce.data)
                } else {
                    reject(bill + " Providers are down received: " + responce.data)
                }
            } catch (error) {
                reject(error)
            }
        });
    }
}
