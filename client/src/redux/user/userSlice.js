import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error when sign-in starts
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.currentUser = null; // Set to null to reflect no user
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null; // Clear the error state explicitly
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, clearError } = userSlice.actions;
export default userSlice.reducer;
