import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { TextField, MenuItem, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const AttendanceForm = () => {
    // State hooks
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [date, setDate] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch the list of students (assuming an API call)
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                
                const response = await axios.get('/api/students'); 
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                alert('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Handle form input changes
    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleStatusChange = (event) => {
        setAttendanceStatus(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedStudent && attendanceStatus && date) {
            setShowQRCode(true);
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5">Attendance Form</Typography>

            {/* Student Selection */}
            {loading ? (
                <CircularProgress />
            ) : (
                <TextField
                    select
                    label="Select Student"
                    value={selectedStudent}
                    onChange={handleStudentChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                >
                    {students.map((student) => (
                        <MenuItem key={student._id} value={student._id}>
                            {student.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {/* Attendance Status */}
            <TextField
                select
                label="Attendance Status"
                value={attendanceStatus}
                onChange={handleStatusChange}
                fullWidth
                margin="normal"
                variant="outlined"
            >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Late">Late</MenuItem>
            </TextField>

            {/* Date Picker */}
            <TextField
                label="Select Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px', backgroundColor: '#3e0a4e' }}
            >
                Submit
            </Button>

            {/* QR Code Display */}
            {showQRCode && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Generated QR Code:</Typography>
                    <QRCode
                        value={`Student: ${selectedStudent}, Status: ${attendanceStatus}, Date: ${date}`}
                        size={200}
                        level="H"
                        includeMargin={true}
                    />
                </div>
            )}
        </div>
    );
};

export default AttendanceForm;
