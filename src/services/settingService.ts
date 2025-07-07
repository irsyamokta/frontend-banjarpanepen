import api from "../api";


export const getSettings = async () => {
    const response = await api.get("/setting/all", {
        withCredentials: true,
    });
    return response.data;
};

export const getSettingById = async (id: string) => {
    const response = await api.get(`/setting/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createSetting = async (payload: any) => {
    const response = await api.post("/setting/create", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateSetting = async (id: string, payload: any) => {
    const response = await api.post(`/setting/update/${id}`, payload, {
        withCredentials: true,
        params: {
            _method: "PATCH",
        },
    });
    return response.data;
};

export const deleteSetting = async (id: string) => {
    const response = await api.delete(`/setting/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};