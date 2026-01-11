import { createSlice } from '@reduxjs/toolkit';
import { fetchDestinations, searchHotels } from '../thunks/hotelsThunks';

const initialState = {
    destinations: [],   
    hotels: [],         
    loading: false,
    error: null
};

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // --- DESTINATIONS ---
            .addCase(fetchDestinations.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.loading = false;
                state.destinations = action.payload;
            })
            .addCase(fetchDestinations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // --- HOTELS SEARCH ---
            .addCase(searchHotels.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
            })
            .addCase(searchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default hotelsSlice.reducer;
