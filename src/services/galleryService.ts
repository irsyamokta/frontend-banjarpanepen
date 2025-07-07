import api from "../api";

export const getGalleries = async () => {
    const response = await api.get("/gallery/all", {
        withCredentials: true,
    });
    return response.data;
};

export const createGallery = async (payload: any) => {
    const response = await api.post("/gallery/create", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateGallery = async (id: string, payload: any) => {
    const response = await api.post(`/gallery/update/${id}`, payload, {
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
    const response = await api.delete(`/gallery/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};