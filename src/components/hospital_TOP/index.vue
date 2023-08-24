<template>
    <div class="top">
       <div class="content">
        <!-- 左侧 -->
        <div class="left" @click="goHome">
            <img src="../../assets/images/logo.png" alt="" >
            <p class="back">尚医通 预约挂号统一平台</p>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <p class="help">帮助中心</p>
            <p class="login">登录/注册</p>
        </div>
       </div>
    </div>
</template>

<script setup lang="ts">
// 引入路由器
import { useRouter } from 'vue-router';
let $router=useRouter()
const goHome = () =>{
    $router.push({path:'/home'})
}
</script>

<style scoped lang="scss">
.top{
    position: fixed;
    z-index: 999;
    width:100%;
    height: 70px;
    // background: #fff;
    display: flex;
    justify-content: center;
    .content{
        width: 1200px;
        height: 70px;
        background: white;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
            p{
                font-size: 20px;
                color: #55a6fe;
                font-weight: 700;
            }
            .back{
                
            }
        }
        .right{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #333;
            .help{
                margin-right: 10px;
            }
        }
    }
}
</style>