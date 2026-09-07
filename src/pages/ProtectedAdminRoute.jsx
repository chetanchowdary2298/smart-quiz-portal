import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  
  // Only allow "yashuu" to pass
  if (savedUser.username !== "yashuu") {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;