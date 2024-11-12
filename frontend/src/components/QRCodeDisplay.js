// src/components/QRCodeDisplay.js
import React from 'react';
import { Typography } from '@mui/material';

const QRCodeDisplay = ({ qrCode }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Typography variant="h6">QR Code for Attendance</Typography>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" style={{ width: '200px', height: '200px' }} />
      ) : (
        <Typography color="textSecondary">No QR Code generated yet</Typography>
      )}
    </div>
  );
};

export default QRCodeDisplay;
