import api from "../api";
import { IUser } from "../types";

export const getUsers = async () => {
    const response = await api.get("/user/all-user", {
        withCredentials: true,
    });
    return response.data;
};

export const updateUser = async (id: string, payload: IUser) => {
    const response = await api.put(`/user/update/${id}`, payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/user/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};