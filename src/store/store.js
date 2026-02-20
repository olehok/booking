import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        favorites: favoritesReducer,
        auth: authReducer,
        theme: themeReducer,
    }
});