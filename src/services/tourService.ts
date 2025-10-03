import api from "../api";

export const getTours = async () => {
    const response = await api.get("/tours", {
        withCredentials: true,
    });
    return response.data;
};

export const getTourById = async (id: string) => {
    const response = await api.get(`/tours/${id}`, {
        withCredentials: true,
    });
    return response.data;
}

export const createTour = async (payload: any) => {
    const response = await api.post("/tours", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateTour = async (id: string, payload: any) => {
    const response = await api.post(`/tours/${id}`, payload, {
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
    const response = await api.delete(`/tours/${id}`, {
        withCredentials: true,
    });
    return response.data;
};