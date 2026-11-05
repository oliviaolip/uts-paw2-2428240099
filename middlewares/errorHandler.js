// Rute tidak dikenal -> 404
function notFoundHandler(req, res) {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
}

// Penanganan galat terpusat (wajib 4 parameter)
function errorHandler(err, req, res, next) {
  // 1. body JSON rusak (dilempar express.json)
  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && 'body' in err)) {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  // 2. ID bukan ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Format ID tidak valid' });
  }

  // 3. pelanggaran schema
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Data tidak valid',
      detail: Object.values(err.errors).map((e) => e.message)
    });
  }

  // 4. nilai unik bentrok
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(', ');
    return res.status(409).json({ message: `Nilai sudah digunakan: ${field}` });
  }

  // 5. galat yang dilempar sengaja (mis. 404 data tidak ditemukan)
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // 6. galat tak terduga
  console.error(err);
  return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
}

module.exports = { notFoundHandler, errorHandler };