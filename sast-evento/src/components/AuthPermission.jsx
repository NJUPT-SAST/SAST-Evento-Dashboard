import React from "react";


//根据权限进行条件渲染
function AuthPermission({children}){
    const isPermisson=localStorage.getItem(children.type.name);
    const Permisson=isPermisson.replace(isPermisson[0],isPermisson[0].toLowerCase())
    return(
        Permisson?<>{children}</>:Permisson
    )
}

export default AuthPermission;