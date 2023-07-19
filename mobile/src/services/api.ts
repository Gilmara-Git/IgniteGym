import axios ,{ AxiosError, AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';

type SignOut = () => void; 

type ApiInstanceProps = AxiosInstance & {
        registerInterceptTokenManager: (signOut: SignOut ) => () => void;
}

type RequestQueueType = {
        onSuccess: (token: string) => void;
        onFailure: (error: AxiosError) => void;
}

const api = axios.create({
        baseURL: 'http://192.168.1.164:3333'
}) as ApiInstanceProps;


let requestsQueue: Array<RequestQueueType> = [];
let isRefreshingToken = false;

api.registerInterceptTokenManager = signOut =>{

        const interceptTokenManager = api.interceptors.response.use((response)=>response, async(requestError)=>{
        if(requestError?.response?.status === 401){
                if(requestError.response.data?.message === "token.invalid" || requestError.response.data?.message === "token.expired"){
                        const { refresh_token }  =  await storageAuthTokenGet();
                        
                        if(!refresh_token){
                                signOut();
                                return Promise.reject(requestError);
                        }

                        // if there us refresh_token we push a requisition to the queue.
                        // But first we get the original requisition config and update the header with the token
                       
                        const originalRequestConfig = requestError.response.config;

                        if(isRefreshingToken){
                                return new Promise((resolve, reject)=>{
                                        requestsQueue.push({
                                                onSuccess:(token:string)=>{
                                                        originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                                                        resolve(api(originalRequestConfig));
                                                }, 
                                                onFailure:(error: AxiosError)=>{
                                                        reject(error);
                                                }
                                        });
                                })

                        }

                        isRefreshingToken = true;

                  

                        // then we use the refresh_token to request a new token and new refresh_token

                        return new Promise(async(resolve, reject)=>{
                                try{    
                                        const { data }  = await api.post('sessions/refresh-token',  { refresh_token} );  
                                        await storageAuthTokenSave({token: data.token, refresh_token: data.refresh_token});
                                       
                                        if(originalRequestConfig.data){
                                                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
                                        }
                                        // update header of current request and the next ones as well with new token
                                        //current request
                                        originalRequestConfig.headers = { "Authorization": `Bearer ${data.token}`};
                                        //next requests
                                        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

                                        // Process requests on queue
                                        requestsQueue.forEach(request =>{
                                                request.onSuccess(data.token)
                                        });

                                        console.log('Fluxo de atualizar o token completado')
                                        resolve(api(originalRequestConfig))

                                }catch(error: any){
                                        reject(error);
                                        signOut();
                                        
                                        requestsQueue.forEach(request=>{
                                                request.onFailure(error);

                                        })
                                }finally{
                                        isRefreshingToken = false;
                                        requestsQueue = [];
                                }
                        })

                       

                }

                signOut();
        }
       
        if(requestError.response && requestError.response.data){
              return  Promise.reject(new AppError(requestError.response.data.message));
        }else{ 
                return Promise.reject(requestError)
        }
        
});

  return () => api.interceptors.response.eject(interceptTokenManager);


}

// api.interceptors.request.use( (config) => {
//         console.log("REQUEST===>>", config)
//         return config;
// }, (error) => {
        
//         return Promise.reject(error);
// })




export { api };