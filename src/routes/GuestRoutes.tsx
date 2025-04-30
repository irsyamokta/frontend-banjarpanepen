import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/ui/spinner/Spinner";
import roleRouteMap from "../utils/roleRouteMap";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (user) {
    const role = user.role || "USER";
    const redirectTo = roleRouteMap[role.toUpperCase()] || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;