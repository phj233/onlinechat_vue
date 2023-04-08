<template>
    <n-layout-content>
      <MainHeader />
        <router-view />
    </n-layout-content>
</template>

<script  setup lang="ts">
import MainHeader from "./MainHeader.vue";
</script>

<style scoped>
.n-layout-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 5px
}
</style>