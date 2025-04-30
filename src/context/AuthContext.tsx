import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import { ILoginPayload, IUser, IAuthContextType } from "../types/index.d";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (payload: ILoginPayload) => {
        const res = await authService.login(payload);
        const user = res.data;

        setUser(user);

        return user;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const checkAuth = async () => {
        try {
            const res = await authService.me();
            const user = res;
            setUser(user);

        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan dalam AuthProvider");
    }
    return context;
};