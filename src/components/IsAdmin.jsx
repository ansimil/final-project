import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

function IsAdmin ( { children } ) {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext);

    if (isLoading) return <p>Loading ...</p>;

    if (!isLoggedIn) {
        return <Navigate to="/signup" />;
    } 
    
    if (isLoggedIn & user.isAdmin) {
        return children;
    }

    else {
        return <Navigate to='/profile'/>
    }
}

export default IsAdmin;
