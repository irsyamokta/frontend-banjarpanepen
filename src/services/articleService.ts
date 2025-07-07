import api from "../api";

export const getArticles = async () => {
    const response = await api.get("/article/all", {
        withCredentials: true,
    });
    return response.data;
};

export const getArticleById = async (id: string) => {
    const response = await api.get(`/article/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createArticle = async (payload: any) => {
    const response = await api.post("/article/create", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateArticle = async (id: string, payload: any) => {
    const response = await api.post(`/article/update/${id}`, payload, {
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
    const response = await api.delete(`/article/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};