import api from "../api";

export const getOrders = async () => {
    const response = await api.get("/orders", {
        withCredentials: true,
    });
    return response.data;
};
