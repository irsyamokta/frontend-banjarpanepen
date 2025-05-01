import api from "../api";
import { IEventPayload } from "../types";

export const getEvents = async () => {
    const response = await api.get("/event/all-event", {
        withCredentials: true,
    });
    return response.data;
};

export const createEvent = async (payload: IEventPayload) => {
    const response = await api.post("/event/create-event", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const updateEvent = async (id: string, payload: IEventPayload) => {
    const response = await api.put(`/event/update-event/${id}`, payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteEvent = async (id: string) => {
    const response = await api.delete(`/event/delete-event/${id}`, {
        withCredentials: true,
    });
    return response.data;
};