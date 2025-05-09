import api from "../api";


export const getSettings = async () => {
    const response = await api.get("/setting/all-setting", {
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
    const response = await api.post("/setting/create-setting", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateSetting = async (id: string, payload: any) => {
    const response = await api.patch(`/setting/update-setting/${id}`, payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteSetting = async (id: string) => {
    const response = await api.delete(`/setting/delete-setting/${id}`, {
        withCredentials: true,
    });
    return response.data;
};