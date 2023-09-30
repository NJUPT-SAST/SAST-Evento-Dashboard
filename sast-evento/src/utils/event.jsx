import request from "./request";
import moment from 'moment';

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjIyMDcwMTIzIiwiZXhwIjoxNzMwMzUzODYxfQ.68v28NTtmNGORXlDf2zJO-jlSGV96ZgI6lBUNNsV__A"


//发起活动
export const postEvent=(value)=>{
    const departments=value.departments.map(item=>{
        return {"id":item}
    })
    return request({
        method:'post',
        url:'/api/event/info',
        headers:{
            token: token
        },
        data:{
            title:value.title,
            description:value.description,
            typeId:value.typeId,
            locationId:Number(value.locationId),
            tag:value.tag,
            departments:departments,
            gmtEventStart:moment(value.EventTime[0]).format('YYYY-MM-DD HH:mm:ss'),
            gmtEventEnd:moment(value.EventTime[1]).format('YYYY-MM-DD HH:mm:ss'),
            gmtRegistrationStart:moment(value.RegistrationTime[0]).format('YYYY-MM-DD HH:mm:ss'),
            gmtRegistrationEnd:moment(value.RegistrationTime[1]).format('YYYY-MM-DD HH:mm:ss')
        }
    })
}

//获取活动
export const getEvent=()=>{
    return request({
        method:"get",
        url:'/api/event/list',
        headers:{
            token: token
        }
    })
}

//删除活动
export const deleteEvent=(value)=>{
    return request({
        method:'delete',
        url:'/api/event/info',
        headers:{
            token: token
        },
        params:{
            eventId:value
        }
    })
}


//取消活动
export const patchEvent=(value)=>{
    return request({
        method:'patch',
        url:'/api/event/info',
        headers:{
            token:token
        },
        params:{
            eventId:value
        },
        data:{
            id:value
        }
    })
}

//修改活动
export const putEvent=(id,value)=>{
    return request({
        method:'put',
        url:'/api/event/info',
        headers:{
            token:token
        },
        params:{eventId:id},
        data:{
            value
        }
    })
}