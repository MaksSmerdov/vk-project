import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
