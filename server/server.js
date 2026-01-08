const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/destination', (req, res) => {
    res.json(database.destination);
});

app.get('/hotels', (req, res) => {
    res.json(database.hotels);  
});

app.post('/hotels', (req, res) => {
    const {city} = req.body;
    const hotels = database.hotels.filter(hotel => hotel.city === city);
    res.json(hotels);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});