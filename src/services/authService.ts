import api from "../api";
import { ILoginPayload, IRegisterPayload } from "../types/index";

const login = async (payload: ILoginPayload) => {
    const response = await api.post("/auth/login", payload, {
        withCredentials: true,
    });
    return response.data;
};

const register = async (payload: IRegisterPayload) => {
    const response = await api.post("/auth/register", payload, {
        withCredentials: true,
    });
    return response.data;
};

const logout = async () => {
    const response = await api.post("/auth/logout", {}, {
        withCredentials: true,
    });
    return response.data;
};

const me = async () => {
    const response = await api.get("/auth/me", {
        withCredentials: true,
    });
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    me,
};

export default authService;