import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";


const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjIyMDcwMTIzIiwiZXhwIjoxNzMwMzUzODYxfQ.68v28NTtmNGORXlDf2zJO-jlSGV96ZgI6lBUNNsV__A"
var request=axios.create({
    // baseURL:'http://evento.sast.fun/',
    // withCredentials:true,
    headers:{
        token:token
    },
    timeout:30000,
})

request.interceptors.response.use(
    (response)=>{
        const {data}=response;
        if(data.success==false){
            Toast.error(data.errMsg)
        }
        const {errMsg}=data
        if(errMsg==="token错误"||errMsg==="token过期") window.location.replace('/login')
        return response
    },
    (error)=>{
        Toast.error(error?.response?.data?.errMsg||"服务端异常")
        return Promise.reject(error)
    }
)

export default request