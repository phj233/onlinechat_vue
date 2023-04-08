<template>
<n-layout-sider bordered show-trigger width="200" collapse-mode="width" :collapsed-width="50">
  <n-menu :options="menuOptions" @update:value="logout"/>
</n-layout-sider>
</template>

<script setup lang="ts">
import {renderIcon, renderLink} from "../../common/render";
import {MenuOption} from "naive-ui";
import {useUserStore} from "../../store/modules/user";
import router from "../../router";

const userStore = useUserStore()
const showAdminMenu = userStore.isAdmin()
const logout = (key: string) => {
    if (key === 'logout') {
        userStore.$reset()
        router.push('/login')
    }
}
const menuOptions: MenuOption[] = [
    {
        label: () => renderLink('首页', 'Home'),
        key: 'home',
        icon: () => renderIcon('ion:home')
    },
    {
        label: () => renderLink('个人账号', 'Account'),
        key: 'account',
        icon: () => renderIcon('mdi:person-circle')
    },
    {
        label: () => renderLink('个人群组', 'Group'),
        key: 'group',
        icon: () => renderIcon('material-symbols:group')
    },
    {
        label: '用户管理',
            // () => renderLink('用户管理', 'AdminUser'),
        key: 'user',
        show: showAdminMenu,
        icon: () => renderIcon('ph:user-fill'),
        children: [
            {
                label: '用户列表',
                    // () => renderLink('用户列表', 'User-list'),
                key: 'user-list'
            },
            {
                label: '已删除用户',
                    // () => renderLink('已删除用户', 'User-deleted'),
                key: 'user-deleted'
            }
        ]
    },
    {
        label: '群组管理',
            // () => renderLink('群组管理', 'GroupManage'),
        key: 'groupManage',
        show: showAdminMenu,
        icon: () => renderIcon('heroicons:user-group-solid'),
        children: [
            {
                label: '群组列表',
                    // () => renderLink('群组列表', 'Group-list'),
                key: 'group-list'
            },
            {
                label: '已删除群组',
                    // () => renderLink('已删除群组', 'Group-deleted'),
                key: 'group-deleted'
            }
        ]
    },
    {
        label: () => '退出登录',
        key:  'logout',
        icon: () => renderIcon('mdi:logout')
    }
]
</script>

<style scoped>

</style>