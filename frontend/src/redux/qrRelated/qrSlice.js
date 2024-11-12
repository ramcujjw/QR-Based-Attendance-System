// qrRelated/qrSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to generate a QR code
export const generateQR = createAsyncThunk(
    'qr/generateQR',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/qr/generate', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action to scan a QR code
export const scanQR = createAsyncThunk(
    'qr/scanQR',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/qr/scan', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const qrSlice = createSlice({
    name: 'qr',
    initialState: {
        qrCodeData: null,
        scanData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generateQR.pending, (state) => {
                state.loading = true;
            })
            .addCase(generateQR.fulfilled, (state, action) => {
                state.qrCodeData = action.payload;
                state.loading = false;
            })
            .addCase(generateQR.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(scanQR.pending, (state) => {
                state.loading = true;
            })
            .addCase(scanQR.fulfilled, (state, action) => {
                state.scanData = action.payload;
                state.loading = false;
            })
            .addCase(scanQR.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const qrReducer = qrSlice.reducer;
