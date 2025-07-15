import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';


export const AuthRouter = () => {
  const token = localStorage.getItem('token');

  if (!token || token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>
};