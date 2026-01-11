import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer
    }
});
