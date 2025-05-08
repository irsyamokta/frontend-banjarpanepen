import api from "../api";

export const getGalleries = async () => {
    const response = await api.get("/gallery/all-gallery", {
        withCredentials: true,
    });
    return response.data;
};

export const createGallery = async (payload: any) => {
    const response = await api.post("/gallery/create-gallery", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateGallery = async (id: string, payload: any) => {
    const response = await api.patch(`/gallery/update-gallery/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteGallery = async (id: string) => {
    const response = await api.delete(`/gallery/delete-gallery/${id}`, {
        withCredentials: true,
    });
    return response.data;
};