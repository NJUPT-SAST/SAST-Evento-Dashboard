//dev-Lay的接口封装
import axios from 'axios'

export const login=(value)=>{
    return axios({
        method:'post',
        // url:'/mini_program/v4alpha/login/admin/',
        data:value
      })
}
