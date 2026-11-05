const PosBankSampah = require('../models/PosBankSampah');

// POST /pos-bank-sampah -> 201
exports.create = async (req, res) => {
  const { kode, nama } = req.body;
  const data = await PosBankSampah.create({ kode, nama });
  res.status(201).json(data);
};

// GET /pos-bank-sampah -> 200 (array seluruh data)
exports.list = async (req, res) => {
  const data = await PosBankSampah.find().sort({ kode: 1 });
  res.status(200).json(data);
};