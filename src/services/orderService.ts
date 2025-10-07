import api from "../api";

export const getOrders = async () => {
    const response = await api.get("/orders", {
        withCredentials: true,
    });
    return response.data;
};

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

