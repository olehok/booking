const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
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
    const {city} = req.query;
    if (!city) {
        return res.json([]);
    }
    const hotelsResponded = database.hotels.filter(
        hotel => hotel.city === city
    );
    res.json(hotelsResponded);
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