const Setoran = require('../models/Setoran');

const FIELD_TOPIC = ['noSetoran', 'namaNasabah', 'beratKg', 'jenisSampah', 'lokasi', 'posBankSampahId'];
const FIELD_FILTER = ['jenisSampah', 'namaNasabah', 'noSetoran'];
const FIELD_SORT = ['beratKg', 'namaNasabah', 'noSetoran', 'jenisSampah', 'createdAt'];

function pickTopicFields(body = {}) {
  const hasil = {};
  for (const key of FIELD_TOPIC) {
    if (body[key] !== undefined) hasil[key] = body[key];
  }
  return hasil; // field di luar tabel topik otomatis diabaikan
}

// POST /setoran -> 201
exports.create = async (req, res) => {
  const data = await Setoran.create(pickTopicFields(req.body));
  res.status(201).json(data);
};

// GET /setoran?jenisSampah=...&sort=beratKg -> 200
exports.list = async (req, res) => {
  const filter = {};
  for (const key of FIELD_FILTER) {
    if (req.query[key] !== undefined && req.query[key] !== '') {
      filter[key] = req.query[key];
    }
  }

  const sort = FIELD_SORT.includes(req.query.sort) ? { [req.query.sort]: 1 } : {};

  const data = await Setoran.find(filter).sort(sort);
  res.status(200).json(data); // tidak ada data cocok -> []
};

// GET /setoran/:id -> 200 dengan populate (kode, nama)
exports.detail = async (req, res) => {
  const data = await Setoran.findById(req.params.id).populate('posBankSampahId', 'kode nama');
  if (!data) {
    const err = new Error('Data setoran tidak ditemukan');
    err.status = 404;
    throw err; // ditangani errorHandler
  }
  res.status(200).json(data);
};