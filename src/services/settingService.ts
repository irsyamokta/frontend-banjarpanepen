import api from "../api";


export const getSettings = async () => {
    const response = await api.get("/settings", {
        withCredentials: true,
    });
    return response.data;
};

export const getSettingById = async (id: string) => {
    const response = await api.get(`/settings/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createSetting = async (payload: any) => {
    const response = await api.post("/settings", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateSetting = async (id: string, payload: any) => {
    const response = await api.post(`/settings/${id}`, payload, {
        withCredentials: true,
        params: {
            _method: "PATCH",
        },
    });
    return response.data;
};

export const deleteSetting = async (id: string) => {
    const response = await api.delete(`/settings/${id}`, {
        withCredentials: true,
    });
    return response.data;
};