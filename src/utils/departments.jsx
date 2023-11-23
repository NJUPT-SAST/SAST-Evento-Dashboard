import request from "./request";

export const getDepartments=()=>{
    return request({
        method:'get',
        url:'/api/admin/departments',
        // headers:{
        //     token:token,  
        // }
    })
}

export const deleteDepartment=(value)=>{
    return request({
        url:'/api/admin/department',
        method:'delete',
        // headers:{
        //     token:token,  
        // }
        params:{
            departmentId:value
        }
    })
}

export const putDepartment=(id,name)=>{
    return request({
        url:'/api/admin/department',
        method:'put',
        headers:{
            // token:token,
            "Content-Type":'multipart/form-data'
        },
        data:{
            departmentId:id,
            departmentName:name
        }
    })
}

export const addDepartment=(name)=>{
    return request({
        url:'/api/admin/department',
        method:'post',
        headers:{
            // token:token,
            "Content-Type":'multipart/form-data'
        },
        data:{
            departmentName:name
        }
    })
}