import api from "../api";

export const getTickets = async () => {
    const response = await api.get("/tickets", {
        withCredentials: true,
    });
    return response.data;
};

export const getTicketById = async (id: string) => {
    const response = await api.get(`/tickets/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createTicket = async (payload: any) => {
    const response = await api.post("/tickets", payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response.data;
};

export const updateTicket = async (id: string, payload: any) => {
    const response = await api.post(`/tickets/${id}`, payload, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: {
            _method: "PATCH",
        },
    });
    return response.data;
};

export const deleteTicket = async (id: string) => {
    const response = await api.delete(`/tickets/${id}`, {
        withCredentials: true,
    });
    return response.data;
};