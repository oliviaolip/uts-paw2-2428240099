const mongoose = require('mongoose');

const setoranSchema = new mongoose.Schema(
  {
    noSetoran: {
      type: String,
      required: [true, 'noSetoran wajib diisi'],
      unique: true,
      trim: true
    },
    namaNasabah: { type: String, required: [true, 'namaNasabah wajib diisi'], trim: true },
    beratKg: {
      type: Number,
      required: [true, 'beratKg wajib diisi'],
      min: [0, 'beratKg minimal 0']
    },
    jenisSampah: { type: String, required: [true, 'jenisSampah wajib diisi'], trim: true },
    // embedding: subdocument tanpa _id sendiri
    lokasi: {
      rt: { type: String, trim: true },
      kelurahan: { type: String, trim: true }
    },
    // referencing ke model PosBankSampah
    posBankSampahId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PosBankSampah',
      required: [true, 'posBankSampahId wajib diisi']
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Setoran', setoranSchema);