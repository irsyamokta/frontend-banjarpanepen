import api from "../api";

export const getOrders = async () => {
    const response = await api.get("/orders", {
        withCredentials: true,
    });
    return response.data;
};

export const getVisitorOrders = async () => {
    const response = await api.get("/orders/visitor", {
        withCredentials: true,
    });
    return response.data;
}

export const getHistoryOrders = async () => {
    const response = await api.get("/orders/history", {
        withCredentials: true,
    });
    return response.data;
}

export const createOrder = async (data: any) => {
    const response = await api.post("/orders", data, {
        withCredentials: true,
    });
    return response.data;
};

export const cancelOrder = async (id: string) => {
    const response = await api.post(`/orders/cancel/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const scanOrder = async (data: string) => {
    const response = await api.post(`/orders/scan`, { 'qr_code': data }, {
        withCredentials: true,
    });
    return response.data;
};

