<template>
  <n-layout-header>
      <n-text style="font-size: 17px;font-weight:bolder">OnlineChat Admin Center</n-text>
      <n-space :inline="true" class="setting">
          <n-switch v-model="switchActive" size="large">
              <template #checked-icon>
                  <n-icon>
                      <Icon icon="material-symbols:nights-stay" />
                  </n-icon>
              </template>
              <template #unchecked-icon>
                  <n-icon>
                      <Icon icon="ph:sun-dim-fill" />
                  </n-icon>
              </template>
          </n-switch>
          <n-button text style="width: 30px;height: 30px">
              <Icon width="25" height="25" icon="carbon:settings" />
          </n-button>
          <n-avatar round size="large" src="https://avatars.githubusercontent.com/u/19668324?v=4" />

      </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import {Icon} from "@iconify/vue";

const switchActive = ref(false);
</script>

<style scoped>
.n-layout-header {
    display: flex;
    background-color: #618ad7;
    border-radius: 10px;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    align-items: center;
}
.setting{
    margin-left: auto;
    align-items: center;
    justify-content: space-between;


}
</style>