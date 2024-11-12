// src/api/attendanceService.js
import axios from 'axios';

const API_URL = '/api/attendance';

export const generateQRCode = async (attendanceData) => {
  try {
    const response = await axios.post(`${API_URL}/take-attendance`, attendanceData);
    return response.data;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

export const getAttendanceRecords = async (teacherId) => {
  try {
    const response = await axios.get(`${API_URL}/records`, { params: { teacherId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    throw error;
  }
};
