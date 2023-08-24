<template>
    <div class="hospital">
        <!-- 左侧导航区 -->
        <div class="menu">
            <div class="top">
                <div class="icon-home">
                    <svg t="1692865016823" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4108" width="16" height="16">
                        <path
                            d="M555.541333 117.994667l312.874667 224.565333A117.333333 117.333333 0 0 1 917.333333 437.866667V800c0 64.8-52.533333 117.333333-117.333333 117.333333H640V746.666667c0-70.688-57.312-128-128-128s-128 57.312-128 128v170.666666H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V437.877333a117.333333 117.333333 0 0 1 48.917333-95.317333l312.874667-224.565333a74.666667 74.666667 0 0 1 87.082666 0z"
                            fill="#8a8a8a" p-id="4109"></path>
                    </svg>
                </div>
                <span> / 医院详情信息</span>

            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/register"
                 class="icon-menu" @click="changeActive('/hospital/register')">
                    <i class="el-icon-document"></i>
                    <span slot="title">预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
                    <i class="el-icon-document"></i>
                    <span slot="title">医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router';
// 获取当前路由信息
let $route = useRoute()
console.log($route.path )
// 获取路由器
let $router =useRouter()
// 左侧菜单点击时间的回调
const changeActive=(path:string)=>{
    $router.push({path})
}
</script>

<style scoped lang="scss">
.hospital {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        .top{
            display: flex;
            color: #7f7f7f;
        }
        .icon-menu {
            display: flex;

        }
    }

    .content {
        flex: 8;
    }
}</style>