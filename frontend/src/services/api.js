import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const extractPDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/extract", formData);

    return response.data;
};

export default api;