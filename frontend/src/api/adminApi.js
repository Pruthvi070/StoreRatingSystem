import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please login again.");
    }
    return token;
};

// Fetch admin dashboard stats
export const fetchAdminDashboard = async () => {
    try {
        const token = getAuthToken();
        const res = await axios.get(`${API_URL}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching dashboard data";
    }
};

// Fetch all users
export const fetchUsers = async () => {
    try {
        const token = getAuthToken();
        const res = await axios.get(`${API_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching users";
    }
};

// Fetch user details by ID
export const fetchUserDetails = async (userId) => {
    try {
        const token = getAuthToken();
        const res = await axios.get(`${API_URL}/admin/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching user details";
    }
};

// Fetch all stores
export const fetchStores = async () => {
    try {
        const token = getAuthToken();
        const res = await axios.get(`${API_URL}/admin/stores`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching stores";
    }
};

// Fetch all ratings
export const fetchRatings = async () => {
    try {
        const token = getAuthToken();
        const res = await axios.get(`${API_URL}/admin/allratings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching ratings";
    }
};

// Create a new user
export const createUser = async (userData) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(`${API_URL}/admin/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error creating user";
    }
};

// Create a new store
export const createStore = async (storeData) => {
    try {
        const token = getAuthToken();
        console.log("Creating store with data:", storeData);
        const response = await axios.post(`${API_URL}/admin/stores`, storeData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("Store creation response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Store creation error:", error.response?.data || error);
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error creating store";
    }
};

// Get all stores
export const getAllStores = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/admin/stores`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching stores";
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching users";
    }
};

// Get all ratings
export const getAllRatings = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/admin/allratings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
        }
        throw error.response?.data?.message || error.message || "Error fetching ratings";
    }
};