import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    // isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            // state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            // state.isAuthenticated = false;
        },
        hydrateAuth: (state, action) => {
            state.user = action.payload;
            // state.isAuthenticated = !!action.payload;
        },
    },
});

export const { login, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
