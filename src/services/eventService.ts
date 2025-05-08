import api from "../api";

export const getEvents = async () => {
    const response = await api.get("/event/all-event", {
        withCredentials: true,
    });
    return response.data;
};

export const getEventById = async (id: string) => {
    const response = await api.get(`/event/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createEvent = async (payload: any) => {
    const response = await api.post("/event/create-event", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateEvent = async (id: string, payload: any) => {
    const response = await api.patch(`/event/update-event/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const deleteEvent = async (id: string) => {
    const response = await api.delete(`/event/delete-event/${id}`, {
        withCredentials: true,
    });
    return response.data;
};