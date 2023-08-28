import React from "react";


//根据权限进行条件渲染
function AuthPermission({ children }) {
    const Permisson = children.type.name.replace(children.type.name[0], children.type.name[0].toLowerCase())
    let str=localStorage.getItem('myArray')
    let arr=JSON.parse(str)
    return (
        arr.includes(Permisson) ? <>{children}</> : ""
    )
}

export default AuthPermission;