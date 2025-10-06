import api from "../api";

export const getTransactions = async () => {
    const response = await api.get("/transactions", {
        withCredentials: true,
    });
    return response.data;
};

export const getTransactionById = async (id: string) => {
    const response = await api.get(`/transactions/${id}`, {
        withCredentials: true,
    });
    return response.data;
};

export const createTransaction = async (payload: any) => {
    const response = await api.post("/transactions", payload, {
        withCredentials: true,
    });
    return response.data;
};

export const deleteTransaction = async (id: string) => {
    const response = await api.delete(`/transactions/${id}`, {
        withCredentials: true,
    });
    return response.data;
};