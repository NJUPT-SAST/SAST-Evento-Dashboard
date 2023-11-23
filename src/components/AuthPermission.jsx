import React,{useEffect} from "react";


//根据权限进行条件渲染
function AuthPermission({children}) {
    useEffect(()=>{
        console.log(children.props.id);
        let arr1=[
            "addEventSlide",
            "deleteManager",
            "deleteEventSlide",
            "deleteEvent",
            "patchEvent",
            "addManager",
            "patchEventSlide",
            "putManager",
            "putEvent"
          ]
          let str1=JSON.stringify(arr1)
          localStorage.setItem(`Arrayevent${children.props.id}`,str1)
    },[])
    const Permisson = children.type.name.replace(children.type.name[0], children.type.name[0].toLowerCase())
    let str=localStorage.getItem(`Arrayevent${children.props.id}`)
    let arr=JSON.parse(str)
    if(arr==null){return ""}
    else{
        return (
            arr.includes(Permisson) ? <>{children}</> : ""
        )
    }
}

export default AuthPermission;