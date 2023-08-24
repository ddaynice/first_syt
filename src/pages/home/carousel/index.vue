<template>
    <el-carousel height="350px" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../../assets/images/web-banner-1.png" alt="">
            </el-carousel-item>
        </el-carousel>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
img{
    height:350px;
}
</style>
