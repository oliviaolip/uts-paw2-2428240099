# UTS PAW II — Topik 27. Bank Sampah

UTS Praktikum Pengembangan Aplikasi Web II (SI0027) — kelas SI5B
Olivia Wijaya / 2428240099

## Menjalankan

```bash
npm install
npm start
```

Buka `http://localhost:3000`.

## Isi `.env`

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/uts_paw2_2428240099
CORS_ORIGIN=http://localhost:5173
```

Kalau memakai MongoDB Atlas, ganti `MONGODB_URI` dengan connection string Atlas
(`mongodb+srv://user:password@cluster0.xxxx.mongodb.net/uts_paw2_2428240099?retryWrites=true&w=majority`)
dan tambahkan IP `0.0.0.0/0` pada Network Access Atlas.

## Endpoint

| Method | Endpoint | Status sukses | Keterangan |
|---|---|---|---|
| POST | `/pos-bank-sampah` | 201 | body `{ "kode": "POS01", "nama": "Pos Sukarami" }` (kode disimpan huruf besar) |
| GET | `/pos-bank-sampah` | 200 | array seluruh pos bank sampah |
| POST | `/setoran` | 201 | hanya field topik yang diterima: `noSetoran`, `namaNasabah`, `beratKg`, `jenisSampah`, `lokasi{rt,kelurahan}`, `posBankSampahId` |
| GET | `/setoran` | 200 | array seluruh setoran |
| GET | `/setoran?jenisSampah=kertas` | 200 | filter sama persis; tanpa parameter = seluruh data |
| GET | `/setoran?sort=beratKg` | 200 | urut menaik; boleh digabung `?jenisSampah=plastik&sort=beratKg` |
| GET | `/setoran/:id` | 200 | `posBankSampahId` di-populate (`kode`, `nama`); 404 bila tidak ada, 400 bila ID salah format |

## Bentuk respons galat

| Kondisi | Status | Isi |
|---|---|---|
| Rute tidak ada | 404 | `{ "message": "..." }` |
| Body JSON rusak | 400 | `{ "message": "Format JSON tidak valid" }` |
| ID bukan ObjectId | 400 | `{ "message": "Format ID tidak valid" }` |
| Pelanggaran schema | 400 | `{ "message": "Data tidak valid", "detail": [ ... ] }` |
| Nilai unik bentrok | 409 | `{ "message": "Nilai sudah digunakan: ..." }` |
| Data tidak ditemukan | 404 | `{ "message": "Data setoran tidak ditemukan" }` |
| Galat tak terduga | 500 | `{ "message": "Terjadi kesalahan pada server" }` |

## Struktur

```
uts-paw2-2428240099/
├── app.js
├── server.js
├── config/db.js
├── models/PosBankSampah.js
├── models/Setoran.js
├── controllers/posBankSampahController.js
├── controllers/setoranController.js
├── routes/posBankSampahRoutes.js
├── routes/setoranRoutes.js
├── middlewares/errorHandler.js
├── .env.example
└── .gitignore
```

`.env` tidak di-commit (sudah ada di `.gitignore`).