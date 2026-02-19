import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        favorites: favoritesReducer,
        auth: authReducer,
    }
});