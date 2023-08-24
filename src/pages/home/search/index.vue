<template>
    <div class="search">
        <el-autocomplete
        v-model="hosname"
        clearable    
        placeholder="请输入医院的名称"
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        @select="goDetail"
        ></el-autocomplete>
        <el-button type="primary" size="default">搜索</el-button>
    </div>
</template>



<script setup lang="ts">
// 引入请求方法
import {reqHospitaaInfo} from '@/api/home'
// 路由跳转
import {useRouter} from 'vue-router'
import { ref } from 'vue';
// 创建路由器对象
let $router = useRouter()
// 手机搜索的关键字（医院的名字）
let hosname=ref<string>('')
// 顶部组件的回调
const fetchData = async(keyword:string,cb:any)=>{
    // 当用户输入完关键字函数会执行一次，发请求获取需要展示的数据即可
   let res= await reqHospitaaInfo(keyword)
    
    //整理数据变成人家组件需要的数据格式
    let showData = res.data.map(item=>{
        return{
            value:item.hosname,//展示医院的名字
            hoscode:item.hoscode//存储医院的编码
        }
    })
    //给组件提供展示的数据
    cb(showData)
}
// 点击某一个推荐项
const goDetail =(item:any)=>{
    // 点击推荐项目进入医院详情页，将来需要携带query参数（医院的编码）
    $router.push({path:'/hospital/register'})
}
</script>
<script lang="ts">
export default{
    name:'Search'
}
</script>




<style scoped lang="scss">
.search {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;

    :deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 10px;
    }
}

/* 深度选择器 */
/* 
    >>>  /deep/ ::v-deep
    */
</style>