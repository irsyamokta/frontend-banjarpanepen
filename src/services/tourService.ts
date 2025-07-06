import api from "../api";

export const getTours = async () => {
    const response = await api.get("/tour/all", {
        withCredentials: true,
    });
    return response.data;
};

export const getTourById = async (id: string) => {
    const response = await api.get(`/tour/${id}`, {
        withCredentials: true,
    });
    return response.data;
}

export const createTour = async (payload: any) => {
    const response = await api.post("/tour/create", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateTour = async (id: string, payload: any) => {
    const response = await api.post(`/tour/update/${id}`, payload, {
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

export const deleteTour = async (id: string) => {
    const response = await api.delete(`/tour/delete/${id}`, {
        withCredentials: true,
    });
    return response.data;
};