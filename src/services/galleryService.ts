import api from "../api";
import { IGalleryPayload } from "../types";

export const getGalleries = async () => {
    const response = await api.get("/gallery/all-gallery", {
        withCredentials: true,
    });
    return response.data;
};

export const createGallery = async (payload: IGalleryPayload) => {
    const response = await api.post("/gallery/create-gallery", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateGallery = async (id: string, payload: IGalleryPayload) => {
    const response = await api.put(`/gallery/update-gallery/${id}`, payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteGallery = async (id: string) => {
    const response = await api.delete(`/gallery/delete-gallery/${id}`, {
        withCredentials: true,
    });
    return response.data;
};