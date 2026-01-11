import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDestinations, searchHotels as searchHotelsApi } from '../../services/hotelsService';

export const fetchDestinations = createAsyncThunk(
    'hotels/fetchDestinations',
    async () => {
        const response = await getDestinations();
        return response.data;
    }
);

export const searchHotels = createAsyncThunk(
    'hotels/searchHotels',
    async ({ city, adults, children }) => {
        const response = await searchHotelsApi({ city, adults, children });
        return response.data;
    }
);