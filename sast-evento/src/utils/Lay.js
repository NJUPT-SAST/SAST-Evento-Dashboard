//dev-Lay的接口封装
import axios from 'axios'


const token=localStorage.getItem('token')
export const login=(value)=>{
    return axios({
        method:'post',
        url:'',
        data:value
      })
}

export const AddSlide=(value)=>{
  return axios({
    method:'post',
    url:'',
    headers:{
      token:`${token}`,
      'Content-Type':'multipart/form-data'
    },
    data:value
  })
}

export const DeleteSlide=(value)=>{
  return axios({
    method:'delete',
    url:'',
    headers:{
     token:`${token}`, 
    },
    data:{
      slideId:value
    }
  })
}

export const EditSlide=(value)=>{
  return axios({
    method:'put',
    url:'',
    headers:{
      token:`${token}`, 
    },
    data:value
  })
}

export const GetSlide=(value)=>{
  return axios({
    method:'get',
    url:'',
    headers:{
      token:`${token}`, 
    },
    data:value
  })
}

export const Addtype=(type,allowValue)=>{
  return axios({
    method:'post',
    url:'',
    headers:{
      token:`${token}`
    },
    data:{
      typeName:type,
      allowConflict:allowValue
    }
  })
}


