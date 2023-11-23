import request from "./request";

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjIyMDcwMTIzIiwiZXhwIjoxNzMwMzUzODYxfQ.68v28NTtmNGORXlDf2zJO-jlSGV96ZgI6lBUNNsV__A"
export const getTypes=()=>{
    return request({
        method:'get',
        url:'/api/admin/types',
        headers:{
            //token:token
        }
    })
}

export const addType=(value)=>{
    return request({
        method:'post',
        url:'/api/admin/type',
        headers:{
            //token:token
        },
        data:{
            typeName:value.typeName,
            allowConflict:value.allowConflict
        }
    })
}

export const deleteType=(value)=>{
    return request({
        method:'delete',
        url:'/api/admin/type',
        headers:{
            //token:token,
            "Content-Type":'multipart/form-data'
        },
        params:{
            typeId:value
        }
    })
}

export const updataType=(id,typeName,allowConflict)=>{
    return request({
        method:'put',
        url:'/api/admin/type',
        // headers:{
        //     //token:token,  
        // }
        data:{
            id,
            typeName,
            allowConflict
        },
    })
}


