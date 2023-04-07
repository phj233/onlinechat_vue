import {defineStore} from "pinia";
import {UserService} from "../../axios/api/UserService";


export interface UserInfo {
    uid: number;
    username: string;
    password: string;
    email: string;
    role: string;
    enabled: boolean;
}
export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        token: "",
        userinfo: null,
    }),
    actions: {
        setToken(token: string) {
            // @ts-ignore
            this.token = token
        },
        setUserinfo(userinfo: UserInfo) {
            // @ts-ignore
            this.userinfo = userinfo
        },
        /**
         * 重置用户信息
         *$userStore.reset()
         */
        resetInfo() {
            this.token = ""
            this.userinfo = null
        },
        isAdmin(): boolean {
            //@ts-ignore
            return this.userinfo?.role.split(',').includes('admin')
        },
        async login( username: string, password: string ): Promise<any>{
            try {
                return  await UserService.login(username, password).then((res) => {
                    if (res.code === 0) {
                        this.token = res.data.token
                        this.userinfo = res.data.userinfo
                    }
                    return Promise.resolve(res)
                })
            }catch (e) {
                return Promise.reject(e)
            }
        },
        async register(user:{
            username: string;
            password: string;
            email: string;
        }): Promise<any> {
            try {
                const res = await UserService.register(user)
                return Promise.resolve(res)
            }catch (e) {
                return Promise.reject(e)
            }
        },
        async getUserInfo():Promise<any> {
            try {
                const res = await UserService.userinfo()
                if (res.status === 0) {
                    this.setUserinfo(res.data.userInfo)
                }
                return Promise.resolve(res)
            }catch (e) {
                return Promise.reject(e)
            }
        },

        async logout() {
            try {
                const res = await UserService.logout()
                if (res.status === 0) {
                    this.resetInfo()
                }
                return Promise.resolve(res)
            }catch (e) {
                return Promise.reject(e)
            }
        }
    },
    persist: true

})