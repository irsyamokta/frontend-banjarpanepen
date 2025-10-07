import api from "../api";

export const getUsers = async () => {
    const response = await api.get("/users", {
        withCredentials: true,
    });
    return response.data;
};

export const getUserByContact = async () => {
    const response = await api.get("/contact", {
        withCredentials: true,
    });
    return response.data[0];
};

export const createUser = async (payload: any) => {
    const response = await api.post("/users", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
}

export const updateUser = async (payload: any) => {
    const response = await api.post(`/users`, payload, {
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

export const updateUserById = async (id: string, payload: any) => {
    const response = await api.post(`/users/${id}`, payload, {
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

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`, {
        withCredentials: true,
    });
    return response.data;
};