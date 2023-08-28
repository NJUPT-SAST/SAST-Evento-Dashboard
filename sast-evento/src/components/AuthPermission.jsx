import React from "react";


//根据权限进行条件渲染
function AuthPermission({children}){
    const isPermisson=localStorage.getItem(children.type.name);
    if(isPermisson==null){
        return ""
    }
    else{
        const Permisson=isPermisson.replace(children.type.name[0],children.type.name[0].toLowerCase())
        return(
            Permisson?<>{children}</>:""
        )
    }
}

export default AuthPermission;