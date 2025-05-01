import api from "../api";
import { IArticlePayload } from "../types";

export const getArticles = async () => {
    const response = await api.get("/article/all-article", {
        withCredentials: true,
    });
    return response.data;
};

export const createArticle = async (payload: IArticlePayload) => {
    const response = await api.post("/article/create-article", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateArticle = async (id: string, payload: IArticlePayload) => {
    const response = await api.put(`/article/update-article/${id}`, payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteArticle = async (id: string) => {
    const response = await api.delete(`/article/delete-article/${id}`, {
        withCredentials: true,
    });
    return response.data;
};