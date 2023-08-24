<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级</div>
            <ul class="hospatial">
                <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
                <li 
                v-for="level in levelArr" 
                :key="level.value"
                @click="changeLevel(level.value)"
                :class="{active:activeFlag==level.value}"
                >{{level.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import {HospitalLevelAndRegionResponseData,HospitalLevelAndRegionArr} from "@/api/home/type"
import { onMounted,ref } from "vue";
//  定义一个存储医院等级的数组
let levelArr = ref<HospitalLevelAndRegionArr>([] )
// 控制医院等级高亮响应式数据
let activeFlag = ref<string>('')
// 组件挂载完毕
onMounted(()=>{
getLevel() 
})
// 获取医院等级的数据
const getLevel =async () =>{
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType')
    // 存储医院等级的数据
    if(result.code==200){
        levelArr.value=result.data
    }
}

// 点击等级按钮高亮的回调
const changeLevel = (level:string)=>{
    activeFlag.value=level
    // 出发自定义事件：将医院等级参数回传给父组件
    $emit('getLevel',level)
}
let $emit = defineEmits(['getLevel'])
</script>

<script lang="ts">
 export default{
    name:'Level',
 }
</script>

<style scoped lang="scss">
.level{
    color: #7f7f7f;
    h1{
        
        font-weight: 900;
        margin: 10px 0;
    }
    .content{
        display: flex;
        .left{
            margin-right: 10px;
        }
        .hospatial{
            display: flex;
            li{
                margin-right: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>