import api from "../api";

export const getPackages = async () => {
    const response = await api.get("/package/all-package", {
        withCredentials: true,
    });
    return response.data;
};

export const createPackage = async (payload: any) => {
    const response = await api.post("/package/create-package", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updatePackage = async (id: string, payload: any) => {
    const response = await api.put(`/package/update-package/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deletePackage = async (id: string) => {
    const response = await api.delete(`/package/delete-package/${id}`, {
        withCredentials: true,
    });
    return response.data;
};