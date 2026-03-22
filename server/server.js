const express = require('express');
const cors = require('cors');
const database = require('./db.json');
require('dotenv').config();

const app = express();

let corsOrigin = process.env.CORS_ORIGIN || '*';
if (corsOrigin !== '*' && corsOrigin.includes(',')) {
  corsOrigin = corsOrigin.split(',').map(origin => origin.trim());
}
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get('/api/destinations', (req, res) => {
  const destinations = database.destination.map(city => ({
    id: city.id,
    label: city.label,
  }));
  res.json(destinations);
});

app.get('/api/home', (req, res) => {
  res.json({ hotels: database.hotels });
});

app.get('/api/hotels/search', (req, res) => {
  const {
    city,
    page = 1,
    limit = 10,
    sort = '',
    search = '',
  } = req.query;

  let hotels = database.hotels;

  if (!city) {
    return res.json({ data: [], total: 0 });
  }
  if (city !== 'all') {
    hotels = hotels.filter(
      hotel => hotel.city === city
    );
  }

  if (search) {
    hotels = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'desc') {
    hotels = hotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
  }

  if (sort === 'asc') {
    hotels = hotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
  }

  const total = hotels.length;
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginatedHotels = hotels.slice(start, end);

  res.json({ data: paginatedHotels, total });
});

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  const baseUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
});
