<template>
    <n-layout-header>
        <n-space inline>
            <n-button text>
                <n-icon size="25px">
                  <Icon icon="solar:hamburger-menu-bold" />
                </n-icon>
            </n-button>
            <n-breadcrumb separator=">">
                <n-breadcrumb-item v-for="route in router.currentRoute.value.matched" :key="route.path">
                    <router-link :to="route.path">
                        {{route.meta.title}}
                    </router-link>
                </n-breadcrumb-item>
            </n-breadcrumb>
        </n-space >
    </n-layout-header>
</template>

<script  setup lang="ts">
import {Icon} from "@iconify/vue";
import router, {routes} from "../../router";

console.log(router.currentRoute.value)
</script>

<style scoped>
.n-layout-header {
    height:80px;
}
.n-space {
    padding-left: 5px;
    height: 60px;
    width: 80%;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: fixed;

}
</style>