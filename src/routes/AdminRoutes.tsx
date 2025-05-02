import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { Spinner } from "../components/ui/spinner/Spinner";

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;

    if (!user) {
        return <Navigate to="/signin" />;
    }

    if (user.role !== "ADMIN") {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};

export default AdminRoute;