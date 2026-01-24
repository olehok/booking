const express = require('express');
const cors = require('cors');
const database = require('./db.json');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/destinations', (req, res) => {
    const destinations = database.destination.map(city => ({
        id: city.id,
        label: city.label,
    }));
    res.json(destinations);
});

app.get('/api/hotels/search', (req, res) => {
    const {
        city,
        page = 1,
        limit = 10
    } = req.query;

    let hotels = database.hotels;

    if (!city) {
        return res.json([]);
    }
    hotels = hotels.filter(
        hotel => hotel.city === city
    );

    const total = hotels.length;

    const start = (page - 1) * limit;
    const end = start + Number(limit);

    const paginatedHotels = hotels.slice(start, end);
    res.json({ data: paginatedHotels, total });
});

// app.post('/api/hotels', (req, res) => {
//     const {city} = req.body;
//     const hotels = database.hotels.filter(hotel => hotel.city === city);
//     res.json(hotels);
// });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});