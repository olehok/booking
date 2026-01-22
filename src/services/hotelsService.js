import { api } from './api';

export const getDestinations = () => {
    return api.get('/api/destinations');
};

export const searchHotels = ({ city, adults, children, page, limit }) => {
    return api.get('/api/hotels/search', {
        params: {
            city,
            adults,
            children,
            page,
            limit
        }
    });
};
