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
        async login(username: string, password: string) {
            try {
                const res = await UserService.login(username, password)
                if (res.status === 0) {
                    this.setToken(res.data.token)
                    this.setUserinfo(res.data.userinfo)
                    return res
                }
                return Promise.resolve(res)
            }catch (e) {
                return Promise.reject(e)
            }
        },

        async getUserInfo() {
            try {
                const res = await UserService.userinfo()
                if (res.status === 0) {
                    this.setUserinfo(res.data.userInfo)
                    return res
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