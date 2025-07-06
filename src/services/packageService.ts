import api from "../api";

export const getPackages = async () => {
    const response = await api.get("/package/all", {
        withCredentials: true,
    });
    return response.data;
};

export const createPackage = async (payload: any) => {
    const response = await api.post("/package/create", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updatePackage = async (id: string, payload: any) => {
    const response = await api.post(`/package/update/${id}`, payload, {
        withCredentials: true,
        params: {
            _method: "PATCH",
        },
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deletePackage = async (id: string) => {
    const response = await api.delete(`/package/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};