import axios from 'axios';

// API url
const API_BASE_URL = 'http://localhost:5210/api';

export const getReservations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Reservations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
};

export const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Reservations`, reservationData);
        return response.data;
    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    }
};

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};