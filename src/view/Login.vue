<template>
    <n-space justify="center">
        <n-card title="Login" hoverable v-show="showLogin">
            <n-form ref="loginFormRef"
                    :model="loginForm"
                    :rules="loginRules"
                    label-width="65px"
                    label-placement="left"
            >
                <n-form-item label="用户名" path="username">
                    <n-input v-model:value="loginForm.username" placeholder="请输入用户名"></n-input>
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input type="password" v-model:value="loginForm.password" placeholder="请输入密码"></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="success" secondary @click="showLogin = false;showRegister = true">注册</n-button>
                    <n-button type="info" secondary @click="onLogin" style="margin-left: 130px">登录</n-button>
                </n-form-item>
            </n-form>
        </n-card>

        <n-card title="Register" hoverable v-show="showRegister">
            <n-form ref="registerFormRef"
                    :model="registerForm"
                    :rules="registerRules"
                    label-width="80px"
                    label-placement="left"
            >
                <n-form-item label="用户名" path="username">
                    <n-input v-model:value="registerForm.username" placeholder="请输入用户名"></n-input>
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input type="password" v-model:value="registerForm.password" placeholder="请输入密码"></n-input>
                </n-form-item>
                <n-form-item label="确认密码" path="repassword">
                    <n-input type="password" v-model:value="registerForm.repassword" placeholder="请再次输入密码"></n-input>
                </n-form-item>
                <n-form-item label="邮箱" path="email">
                    <n-input v-model:value="registerForm.email" placeholder="请输入邮箱"></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="success" secondary @click="showLogin = true;showRegister = false">登录</n-button>
                    <n-button type="info" secondary @click="onRegister" style="margin-left: 130px">注册</n-button>
                </n-form-item>
            </n-form>
        </n-card>
    </n-space>
</template>

<script setup lang="ts">

import {useUserStore} from "../store/modules/user";
import {showMessage} from "../axios/status";
import router from "../router";
import {FormInst, FormRules} from "naive-ui";

const showLogin = ref(true)
const showRegister = ref(false)

const userStore = useUserStore()
const loginFormRef = ref<FormInst>()
const loginForm = reactive({
    username: '',
    password: ''
})
const loginRules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: ['input','blur']
        },
        {
            min: 3,
            max: 10,
            message: '用户名长度为3-10位',
            trigger: ['input','blur']
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '用户名只能是字母数字',
            trigger: ['input','blur']
        }
        ],
    password: [
        {required: true, message: '请输入密码',trigger: 'blur'},
        {min: 3, max: 10, message: '密码长度为3-10位',trigger: 'input'}
    ]
}

const registerFormRef = ref<FormInst>()
const registerForm = reactive({
    username: '',
    password: '',
    repassword:'',
    email: '',
})
const registerRules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: ['input','blur']
        },
        {
            min: 3,
            max: 10,
            message: '用户名长度为3-10位',
            trigger: ['input','blur']
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '用户名只能是字母数字',
            trigger: ['input','blur']
        }
    ],
    password: [
        {required: true, message: '请输入密码',trigger: 'blur'},
        {min: 3, max: 10, message: '密码长度为3-10位',trigger: 'input'}
    ],
    repassword: [
        {required: true, message: '请再次输入密码',trigger: 'blur'},
        {min: 3, max: 10, message: '密码长度为3-10位',trigger: 'input'},
        {
            validator: (rule, value) => {
                if (value !== registerForm.password) {
                    return Promise.reject('两次输入密码不一致')
                } else {
                    return Promise.resolve()
                }
            },
            trigger: 'blur'
        }
    ],
    email: [
        {required: true, message: '请输入邮箱',trigger: 'blur'},
        {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: ['input','blur']
        }
    ]
}
const onLogin = () => {
    userStore.login(loginForm.username, loginForm.password).then(
        res => {
            if (res.code == 0) {
                showMessage(res.code,'登录成功')
                router.push('/admin')
            } else {
                showMessage(res.code,res.message)
            }
        }
    )

}
const onRegister = () => {
    userStore.register(registerForm).then(
        res => {
            if (res.code == 0) {
                showMessage(res.code,'注册成功')
                router.push('/login')
            } else {
                showMessage(res.code,res.message)
            }
        }
    )
}
</script>

<style scoped>
</style>