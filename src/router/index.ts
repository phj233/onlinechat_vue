import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useUserStore} from "../store/modules/user";
import {UserService} from "../axios/api/UserService";
import {createDiscreteApi} from "naive-ui";
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../view/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../view/Login.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../view/Admin.vue')
    }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const  userStore = useUserStore()
    const token = userStore.token
    console.log(token)
    const naiveMessage = createDiscreteApi(["message"]).message
    if(from.path === '/login' || to.path === '/login'){
        next()
    }else if (token === '' || token === null) {
        naiveMessage.error('未获取到token，请重新登录')
        next('/login')
    }else {
        UserService.checktoken().then(res => {
            console.log(res)
            if(res.code === 0){
                naiveMessage.success('token有效,登录成功')
                next()
            }else{
                naiveMessage.error('token已过期，请重新登录')
                userStore.token = ''
                next('/login')
            }
        }).catch(e => {
            naiveMessage.error(e)
        })

        userStore.getUserInfo().then(res => {
            if(res.code === 0){
                userStore.setUserinfo(res.data.userinfo)
            } else {
                naiveMessage.error('获取用户信息失败')
            }
        }).catch(e => {
            console.log(e)
        })
    }

})

export default router