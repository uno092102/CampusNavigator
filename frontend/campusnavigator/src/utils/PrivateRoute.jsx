// src/utils/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from './auth';

const PrivateRoute = ({ children }) => {
  const isAuth = isAdminAuthenticated();
  return isAuth ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;