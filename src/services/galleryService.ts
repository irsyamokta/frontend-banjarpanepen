import api from "../api";

export const getGalleries = async () => {
    const response = await api.get("/galleries", {
        withCredentials: true,
    });
    return response.data;
};

export const createGallery = async (payload: any) => {
    const response = await api.post("/galleries", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateGallery = async (id: string, payload: any) => {
    const response = await api.post(`/galleries/${id}`, payload, {
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

export const deleteGallery = async (id: string) => {
    const response = await api.delete(`/galleries/${id}`, {
        withCredentials: true,
    });
    return response.data;
};