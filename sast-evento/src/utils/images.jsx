import request from './request'

export const getPicturelist=(dir,num)=>{
    return request({
        method:'get',
        url:'/api/picture/list',
        params:{
            size:10,
            num:num,
            dir:dir
        }
    })
}