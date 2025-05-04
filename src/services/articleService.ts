import api from "../api";

export const getArticles = async () => {
    const response = await api.get("/article/all-article", {
        withCredentials: true,
    });
    return response.data;
};

export const createArticle = async (payload: any) => {
    const response = await api.post("/article/create-article", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateArticle = async (id: string, payload: any) => {
    const response = await api.patch(`/article/update-article/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteArticle = async (id: string) => {
    const response = await api.delete(`/article/delete-article/${id}`, {
        withCredentials: true,
    });
    return response.data;
};