
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../services/api';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token || !isTokenValid(token)) {
    // Remove invalid token and redirect to login
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
