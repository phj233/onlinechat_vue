import axios from 'axios'
import {useUserStore} from "../store/modules/user";

const baseURL = '/api'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(

    config => {
        const userStore = useUserStore()
        // 在发送请求之前做些什么
        // 例如，设置请求头、添加请求参数、处理跨域问题等
        if (userStore.token !== '' && userStore.token !== null) {
            config.headers.Authorization = userStore.token
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        // 例如，检查响应状态码、解析响应数据等
        return response
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

// 封装 GET POST 请求并导出
export function request(url = '', data?: any, type = 'POST'):Promise<any>{
    return new Promise((resolve,reject)=>{
        let promise
        if(type.toUpperCase() === 'GET'){
            promise = instance.get(url,{data})
        }else if(type.toUpperCase() === 'POST'){
            promise = instance.post(url,data)
        }
        // @ts-ignore
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            reject(error.data)
        })
    })
}
