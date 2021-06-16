import axiosHTTP from '../common';

export class GetFromProvider {
    provider: string
    callBackURL: string
    providerPort = 3000;

    constructor(provider: string, callBackURL: string) {
        this.provider = provider,
        this.callBackURL = callBackURL
    }
    
    async postToProvider() {
        const getDetails = new Promise<any>(async (resolve, reject) => {  
            try {
                const responce = await axiosHTTP.get(`http://localhost:${this.providerPort}/providers/${this.provider}`)
                resolve(responce.data)
            } catch (error) {
                reject(error)
            }
        });
    
        getDetails.then(responce => {
            console.log(JSON.stringify(responce))
            return responce;
        }).catch(err => {
            console.log(err)
        })
    }
    
}
