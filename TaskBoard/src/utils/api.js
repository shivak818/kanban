import axios from "axios";

const API_URL = "https://kanbanboard-oo1f.onrender.com/api"; // Adjust this if your backend is running on a different port or URL

// Helper function to get the token
const getToken = () => localStorage.getItem("token");

// Task APIs
export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            headers: {
                Authorization: `${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const createTask = async (task) => {
    console.log("token", getToken());
    try {
        const response = await axios.post(`${API_URL}/tasks`, task, {
            headers: {
                Authorization: `${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (task) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${task._id}`, task, {
            headers: {
                Authorization: `${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_URL}/tasks/${taskId}`, {
            headers: {
                Authorization: `${getToken()}`,
            },
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

// Authentication APIs
export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, user);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, user);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};
