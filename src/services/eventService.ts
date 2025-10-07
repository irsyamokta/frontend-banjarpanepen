import api from "../api";

export const getEvents = async () => {
    const response = await api.get("/events", {
        withCredentials: true,
    });
    return response.data;
};

export const getEventById = async (id: string) => {
    const response = await api.get(`/events/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createEvent = async (payload: any) => {
    const response = await api.post("/events", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateEvent = async (id: string, payload: any) => {
    const response = await api.post(`/events/${id}`, payload, {
        withCredentials: true,
        params: {
            _method: "PATCH",
        },
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteEvent = async (id: string) => {
    const response = await api.delete(`/events/${id}`, {
        withCredentials: true,
    });
    return response.data;
};