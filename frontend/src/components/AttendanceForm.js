// src/components/AttendanceForm.jsx

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { TextField, MenuItem, Button, Typography } from '@mui/material';

const AttendanceForm = () => {
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [date, setDate] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);

    const handleStatusChange = (event) => {
        setAttendanceStatus(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (attendanceStatus && date) {
            setShowQRCode(true);
        } else {
            alert('Please select both attendance status and date');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5">Student Name: ramcy</Typography>
            <Typography variant="h6">Subject Name: react</Typography>
            
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
            
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px', backgroundColor: '#3e0a4e' }}
            >
                Submit
            </Button>

            {showQRCode && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Generated QR Code:</Typography>
                    <QRCode
                        value={`Student: ramcy, Subject: react, Status: ${attendanceStatus}, Date: ${date}`}
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
