import request from "./request";


const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYjIyMDcwMTIzIiwiZXhwIjoxNzMwMzUzODYxfQ.68v28NTtmNGORXlDf2zJO-jlSGV96ZgI6lBUNNsV__A"
export const getSlide=(current)=>{
    return request({
        method:'get',
        url:'/api/slide/home/list',
        // headers:{
        //     token:token,  
        // }
        params:{
            size:5,
            current:current
        }
    })
}