import axios from "axios";
import { Toast } from "@douyinfe/semi-ui";

var request=axios.create({
    // baseURL:'http://evento.sast.fun/api',
    // withCredentials:true,
    timeout:30000,
})

request.interceptors.response.use(
    (response)=>{
        const {data}=response;
        const {errMsg}=data
        if(errMsg==="token错误"||errMsg==="token过期") window.location.replace('http://localhost:3000/login')
        return response
    },
    (error)=>{
        Toast.error(error?.response?.data?.errMsg||"服务端异常")
        return Promise.reject(error)
    }
)

export default request