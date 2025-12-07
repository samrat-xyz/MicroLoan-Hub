import React from 'react'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

function PrivateRoutes({children}) {
    const {user,loading} = useAuth();
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
  return <Navigate state={location.pathname} to='/login'></Navigate> 
}

export default PrivateRoutes
