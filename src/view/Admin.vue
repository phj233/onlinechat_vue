<template>
<n-config-provider>
    <n-layout>
        <Header />
        <n-layout has-sider>
            <Sider />
            <Main />
        </n-layout>
    </n-layout>
</n-config-provider>
</template>

<script setup lang="ts">

import {darkTheme} from "naive-ui";
import Sider from "../layout/admin/Sider.vue";
import Header from "../layout/admin/Header.vue";
import Main from "../layout/admin/Main.vue";
</script>

<style scoped>

</style>