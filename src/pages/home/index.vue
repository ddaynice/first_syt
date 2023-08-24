<template>
    <div>
        <!-- 首页 轮播图结构-->
        <Carousel></Carousel>
        <!-- 首页搜索医院的表单区域 -->
        <Search></Search>
        <!-- 底部展示医院的结构 -->
        <el-row :gutter="20">
            <el-col :span="20">
                <!--  等级子组件-->
                <level @getLevel="getLevel"></level>
                <!-- 地区 -->
                <Region @getRegion="getRegion"></Region>
                <!-- 医院结构 -->
                <div class="hospital" v-if="hasHospitalArr.length>0">
                    <card class="item" 
                    v-for="(item,index) in hasHospitalArr" 
                    :key="index"
                    :hospitalInfo="item"
                    
                    ></card>

                </div>
                <el-empty v-else description="暂无数据"></el-empty>
                <!-- 分页器 -->
                <div class="block">
                    <el-pagination 
                    :background="true" 
                    v-model:current-page="pageNo" 
                    :page-sizes="[10, 20, 30, 40]"
                    v-model:page-size="pageSize" 
                    layout=" prev, pager, next, jumper, ->,sizes,total" 
                    :total="total"
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    >
                    </el-pagination>
                </div>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="4">
            <Tip></Tip>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted } from 'vue'
import { reqHospital } from '@/api/home'
// 引入轮播图
import Carousel from './carousel/index.vue'
// 引入首页搜索的组件
import Search from './search/index.vue'
// 引入首页等级组件
import level from './level/index.vue'
// 引入首页地区选择
import Region from './region/index.vue'
// 引入医院卡片结构
import Card from './card/index.vue'
import type {Content,HospitalResponseData} from '@/api/home/type'
// 引入右侧结构
import Tip from './tip/index.vue'
// 引入分页器
// import Pagination from './pagination/index.vue'
// 分页器需要的数据
import { ref } from 'vue'
// 分页器页码
let pageNo = ref<number>(1)
// 一页多少条数据 
let pageSize = ref<number>(10)
let total= ref<number>(0)
// 存储已有的医院的数据
let hasHospitalArr = ref<Content>([])
// 存储医院的等级相应数据
let hostype = ref<string>('')
// 存储医院的地区
let districtCode = ref<string>('')
// 组件挂载完毕发一次请求
onMounted(() => {
    getHospitalInfo()
})
// 获取已有的医院的数据
const getHospitalInfo = async() => {
    // 获取医院的数据：默认获取第一页，一页十个医院的数据
    let result:HospitalResponseData= await reqHospital(pageNo.value, pageSize.value,hostype.value,districtCode.value)
   if(result.code===200){
    // 存储医院数据
    hasHospitalArr.value=result.data.content
    // 存储医院的总个数
    total.value=result.data.totalElements
   }
}
// 分页器页码发生变化时候的回调
const currentChange =()=>{
    getHospitalInfo()
}
// 分页器下拉菜单变化的时候会触发
const sizeChange = ()=>{
    getHospitalInfo() 
}
// 子组件的自定义事件 ：获取儿子给父组件传递过来的等级参数
const getLevel = (level:string)=>{
    // 手机参数：医院等级的参数
    hostype.value=level
    // 再次发请求
    getHospitalInfo()
}
const getRegion=(region:string)=>{
    districtCode.value=region
    // 再次发送请求
    getHospitalInfo() 
}
</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin-bottom: 12px;
    }
}
</style>