import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;

            if (state.favorites.includes(id)) {
                state.favorites = state.favorites.filter(fav => fav !== id);
            } else {
                state.favorites.push(id);
            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(state.favorites)
            );
        },

        resetFavorites: (state) => {
            state.favorites = [];
            localStorage.removeItem("favorites");
        },

        hydrateFavorites: (state, action) => {
            state.favorites = action.payload;
        }
    }
});

export const { toggleFavorite, hydrateFavorites, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
