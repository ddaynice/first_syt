<template>
  <div class="container">
    <!-- 顶部全局 -->
    <HospitalTop></HospitalTop>
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件 -->
      <router-view></router-view>
    </div>
    <HospitalBottom></HospitalBottom>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request";
import { onMounted } from "vue";
onMounted(()=>{
  request.get('/hosp/hospital/{1}/{10}').then(res=>{
    console.log('APP组件展示获取的数据',res)
  })
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    // background-color: red;
    min-height: 700px;
  }


}
</style>