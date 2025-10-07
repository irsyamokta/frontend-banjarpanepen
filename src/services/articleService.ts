import api from "../api";

export const getArticles = async () => {
    const response = await api.get("/articles", {
        withCredentials: true,
    });
    return response.data;
};

export const getArticleById = async (id: string) => {
    const response = await api.get(`/articles/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createArticle = async (payload: any) => {
    const response = await api.post("/articles", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateArticle = async (id: string, payload: any) => {
    const response = await api.post(`/articles/${id}`, payload, {
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

export const deleteArticle = async (id: string) => {
    const response = await api.delete(`/articles/${id}`, {
        withCredentials: true,
    });
    return response.data;
};