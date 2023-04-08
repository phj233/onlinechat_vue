import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useUserStore} from "../store/modules/user";
import {UserService} from "../axios/api/UserService";
import {createDiscreteApi} from "naive-ui";
export const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../view/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../view/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../view/Admin.vue'),
        meta: {
            title: '管理中心'
        },
        children: [
            {
                path: 'account',
                name: 'Account',
                component: () => import('../layout/admin/Account.vue'),
                meta: {
                    title: '个人账号'
                }
            },
            {
                path: 'group',
                name: 'Group',
                component: () => import('../layout/admin/Group.vue'),
                meta: {
                    title: '个人群组'
                }
            }
            ]
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