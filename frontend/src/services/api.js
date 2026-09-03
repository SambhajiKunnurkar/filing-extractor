import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const extractPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/extract", formData);

    return response.data;
};

export default api;