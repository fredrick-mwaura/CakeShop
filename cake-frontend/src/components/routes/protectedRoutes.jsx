import { Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Assuming PrivateRoute is your auth check component

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = true;
  
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <PrivateRoute>{element}</PrivateRoute> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
