<template>
    <div class="region">
      <div class="content">
        <div class="left">地区</div>
        <ul >
            <li :class="{active:RegionFlag==''}" @click="changeRegion('')">全部</li>
            <li 
            v-for="item in regionArr" 
            :key="item.value"
            @click="changeRegion(item.value)"
            :class="{active:RegionFlag==item.value}"
            >{{ item.name }}</li>  
        </ul>
      </div>
    </div>
</template>

<script setup lang="ts">

import { reqHospitalLevelAndRegion } from "@/api/home";
import {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type"

import { onMounted,ref } from "vue";
// 存储地区的数据
let regionArr = ref<HospitalLevelAndRegionArr>([])
// 地区高亮的响应式数据
let RegionFlag = ref<string>('')
// 地区组件挂载完毕获取地区数据
onMounted(()=>{
    getRegion()
})
// 获取地区的数据
const getRegion = async()=>{
   let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin")
//  存储全部地区的数据
if(result.code===200){
    regionArr.value=result.data
}
}
// 点击不同区域按钮回调
const changeRegion = (region:string)=>{
    RegionFlag.value = region
    $emit('getRegion',region)
}
let $emit=defineEmits(['getRegion'])
</script>

<script lang="ts">
export default {
    name:'Region'
}
</script>

<style scoped lang="scss">
    .region{
        color: #7f7f7f;
        margin-top: 10px;
        .content{
            display: flex;
            .left{
                width: 34px;
                margin-right: 10px;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                li{
                    margin-right: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    &.active{
                        color: #55a6fe;
                    }
                }
                li:hover{
                    color: #55a6fe;
                }
            }
        }
    }
</style>