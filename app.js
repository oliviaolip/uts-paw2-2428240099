require('dotenv').config();
const express = require('express');
const cors = require('cors');
const posBankSampahRoutes = require('./routes/posBankSampahRoutes');
const setoranRoutes = require('./routes/setoranRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, methods: ['GET', 'POST'] }));
app.use(express.json());

app.use('/pos-bank-sampah', posBankSampahRoutes);
app.use('/setoran', setoranRoutes);

app.use(notFoundHandler); // rute tidak dikenal -> 404
app.use(errorHandler);    // penanganan galat terpusat (paling akhir)

module.exports = app;