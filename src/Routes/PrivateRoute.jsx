import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../components/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(authContext);
    const location = useLocation();
    console.log(location);

    if(user){
        return children;
    }
    if(loading){
        return <p>loading...</p>
    }
    return <Navigate to='/login' state={{from: location}} replace={true}></Navigate>
};

export default PrivateRoute;