import { store } from '../store/store';
import { searchHotels } from '../store/thunks/hotelsThunks';

export const hotelsLoader = async ({ request }) => {
    const url = new URL(request.url);

    const city = url.searchParams.get('city');
    const adults = Number(url.searchParams.get('adults')) || 1;
    const children = Number(url.searchParams.get('children')) || 0;

    if (!city) {
        return null;
    }

    await store.dispatch(
        searchHotels({ city, adults, children })
    );

    return null;
};
