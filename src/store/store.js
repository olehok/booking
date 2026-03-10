import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';
import favoritesReducer from './slices/favoritesSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        favorites: favoritesReducer,
        auth: authReducer,
        theme: themeReducer,
        language: languageReducer,
    }
});