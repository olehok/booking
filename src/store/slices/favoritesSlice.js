import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const hotel = action.payload;
            const existingFavorite = state.favorites.find(
                fav => fav.id === hotel.id
            );

            if (existingFavorite) {
                state.favorites = state.favorites.filter(
                    fav => fav.id !== hotel.id
                );
            } else {
                state.favorites.push(hotel);
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
            state.favorites = action.payload || [];
        }
    }
});

export const { toggleFavorite, hydrateFavorites, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
