import { Navigate } from "react-router-dom";

function AuthRoute({children}){
    const isToken=localStorage.getItem('token');
    return(
            isToken?<>{children}</>:<Navigate to="/login" replace/>
    )
}

export default AuthRoute;