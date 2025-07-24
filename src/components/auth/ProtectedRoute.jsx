import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("🔐 ProtectedRoute auth state:", { token, user });
  const location = useLocation();

  // 1. If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If user object has no role, fail-safe
  if (!user.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Ensure user stays in their role's route space
  const rolePrefix = `/${user.role}/`;
  if (!location.pathname.startsWith(rolePrefix)) {
    return <Navigate to={`/${user.role}/overview`} replace />;
  }

  // 4. If all checks pass, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
