import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: "en",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload;
        },
        hydrateLanguage: (state, action) => {
            state.lang = action.payload || "en";
        },
    },
});

export const { setLanguage, hydrateLanguage } = languageSlice.actions;
export default languageSlice.reducer;