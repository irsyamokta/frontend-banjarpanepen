import api from "../api";

export const getUsers = async () => {
    const response = await api.get("/user/all", {
        withCredentials: true,
    });
    return response.data;
};

export const getUserByContact = async () => {
    const response = await api.get("/user/contact", {
        withCredentials: true,
    });
    return response.data;
};

export const updateUser = async (payload: any) => {
    const response = await api.post(`/user/update`, payload, {
        withCredentials: true,
        params: {
            _method: "PATCH",
        },
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteUser = async () => {
    const response = await api.delete(`/user/delete`, {
        withCredentials: true,
    });
    return response.data;
};