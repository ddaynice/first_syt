// 对于axios函数库进行二次封装
// 为什么要进行二次封装axios
// 目的：可利用axios请求，响应拦截器功能
// 目的2：请求拦截器，一般可以在请求头中携带公共的参数：token
// 3.响应拦截器，可以简化服务器返回的数据，处理http网络错误
import axios from 'axios'

import { ElMessage } from 'element-plus';

// 利用axios.create方法创建一个axios实例:可以设置基础路径、超时的时间设置
const request = axios.create({
    baseURL: '/api',//请求基础路径设置
    timeout: 5000//超时的时间的设置,超出5秒请求就是失败 
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // config：请求拦截器回调注入的对象（配置对象）,配置对象的身上最重要的一件事headers属性
    // 可以通过请求头携带公共参数-token
    return config;
})

// 响应拦截器
request.interceptors.response.use((response) => {
    // 响应拦截器成功的回调，一般会进行简化数据
    // response就是服务器返回的数组
    return response.data
}, (error) => {
    // 处理http网络错误
    let status = error.response.status
    switch (status) {
        case 404:
            ElMessage({
                type: 'error',
                message: '请求失败路径出现问题'
            })
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
            ElMessage({
                type: 'error',
                message: '服务器挂了'
            })
            break;
        case 401:
            ElMessage({
                type: 'error',
                message: '请求参数有误'
            })
            break;
    }
    return Promise.reject(new Error(error.message))
})

// 对外暴露axios
export default request 