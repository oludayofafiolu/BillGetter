import axiosHTTP from '../common';
import { ProviderRequest } from '../Models/ProviderRequest';
import { BillSchema } from '../Models/BillSchema';

export class GetFromProvider {
    providerPort = 3000;
    [key: string]: any;

    constructor() { }

    getDataFromProviders(providers: [string]) {
        let allBills: any[] = [];
        var promises: Promise<any>[] = []

        providers.forEach((element: string) => {
            promises.push(this.getData(element))
        });

        return new Promise<any>(async (resolve, reject) => {
            Promise.allSettled(promises)
            .then((results) => {
                results.forEach(result => {
                    if (result.status === 'fulfilled') {
                        // console.log("result.value " + JSON.stringify(result.value));
                        allBills.push(result.value)
                    }
                })
                if (allBills.length != 0) {
                    resolve(allBills)
                } else {
                    reject()
                }
                
            }
            ).catch(error => {
                reject(error)
            });
        })
    }

    async getData(bill: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const responce = await axiosHTTP.get(`http://localhost:${this.providerPort}/providers/${bill}`)
                if (responce.status == 200) {
                    resolve({ [bill]: responce.data })
                } else {
                    reject(bill + " Providers are down received: " + responce.data)
                }
            } catch (error) {
                reject(error)
            }
        });
    }
}
