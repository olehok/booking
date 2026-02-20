import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode =
                state.mode === "light" ? "dark" : "light";
        },
        hydrateTheme: (state, action) => {
            state.mode = action.payload || "light";
        },
    },
});

export const { toggleTheme, hydrateTheme } =
    themeSlice.actions;

export default themeSlice.reducer;