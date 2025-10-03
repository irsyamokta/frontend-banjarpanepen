import api from "../api";

export const getPackages = async () => {
    const response = await api.get("/packages", {
        withCredentials: true,
    });
    return response.data;
};

export const createPackage = async (payload: any) => {
    const response = await api.post("/packages", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updatePackage = async (id: string, payload: any) => {
    const response = await api.post(`/packages/${id}`, payload, {
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
    const response = await api.delete(`/packages/${id}`, {
        withCredentials: true,
    });
    return response.data;
};