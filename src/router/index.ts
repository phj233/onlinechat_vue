import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useUserStore} from "../store/modules/user";
import {UserService} from "../axios/api/UserService";
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
    const naiveMessage = useMessage()
    if(from.path === '/login' || to.path === '/login'){
        next()
    }else if (token === '' || token === null) {
        naiveMessage.error('未获取到token，请重新登录')
        next('/login')
    }else {
        const res:Promise<any> = UserService.checktoken()
        // @ts-ignore
        if (res.code !==0) {
            naiveMessage.error('token失效，请重新登录')
            next('/login')
        }
        next()
    }

})

export default router