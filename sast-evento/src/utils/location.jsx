import request from "./request";

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjIyMDcwMTIzIiwiZXhwIjoxNzMwMzUzODYxfQ.68v28NTtmNGORXlDf2zJO-jlSGV96ZgI6lBUNNsV__A"
export const getLocations=()=>{
    return request({
        method:'get',
        url:'/api/admin/locations',
        headers:{
            //token:token
        }
    })
}

export const postLocation=(locationName,parentId)=>{
    return request({
        method:'post',
        url:'/api/admin/location',
        headers:{
            //token:token
        },
        data:{
            locationName,
            parentId
        }
    })
}

export const deleteLocation=(id)=>{
    return request({
        method:'delete',
        url:'/api/admin/location',
        headers:{
            //token:token
        },
        params:{
            locationId:id
        }
    })
}

export const updateLocation=(id,locationName)=>{
    return request({
        method:'patch',
        url:'/api/admin/location',
        headers:{
            //token:token,
            "Content-Type":'multipart/form-data'
        },
        data:{
            id,
            locationName
        }
    })  
}