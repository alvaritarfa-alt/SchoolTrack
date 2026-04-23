import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has a profile and the role is allowed
  if (userProfile && allowedRoles && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/unauthorised" replace />;
  }

  // If no profile and we're checking roles, redirect to login to get profile first
  if (!userProfile && allowedRoles) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;