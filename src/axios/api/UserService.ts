import {request} from "../axios";

export class UserService{
    static async login(username:String,password:String):Promise<any>{
        return request('/login?username='+username+'&password='+password,'','POST')
    }

    static async register(user:any):Promise<any>{
        return request('/user/register',user,'POST')
    }

    static async userinfo():Promise<any>{
        return request('/user/info',null,'GET')
    }

    static async checktoken():Promise<any>{
        return request('/user/checktoken',null,'GET')
    }

    static async logout():Promise<any>{
        return request('/logout',null,'GET')
    }
}