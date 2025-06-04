import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteForAuth = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <Outlet />;
};

export default ProtectedRouteForAuth;
