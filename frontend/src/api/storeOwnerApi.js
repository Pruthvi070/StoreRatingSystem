import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with actual API URL

// Function to get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Fetch store details
export const fetchStoreDetails = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/stores/${userId}`, {
            headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching store details:", error);
        throw error;
    }
};

// Fetch average rating of the store
export const fetchAverageRating = async () => {
    const res = await axios.get(`${API_URL}/stores/average-rating`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return res.data;
};

// Fetch all ratings given for the store
export const fetchStoreRatings = async (storeId) => {
    const res = await axios.get(`${API_URL}/users/ratings/${storeId}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    return res.data;
};
