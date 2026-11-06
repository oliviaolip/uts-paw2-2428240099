# UTS PAW II — Bank Sampah (Setoran)

Olivia Wijaya · 2428240099 · SI5B · Topik 27

## Cara menjalankan
1. `npm install`
2. Salin `.env.example` menjadi `.env`, sesuaikan `MONGODB_URI`
3. `npm start` → http://localhost:3000

## Alasan desain data model
- Embedding `lokasi { rt, kelurahan }`: lokasi selalu dibaca bersama setoran, jarang
  berubah, dan tidak dipakai entitas lain, sehingga cukup satu kali baca tanpa join.
- Referencing `posBankSampahId`: satu pos dipakai banyak setoran dan namanya dapat
  berubah, jadi disimpan sekali di collection sendiri lalu di-populate saat dibutuhkan.

## Endpoint
| Method | Path | Keterangan |
|---|---|---|
| POST | /pos-bank-sampah | 201; 409 bila kode ganda |
| GET | /pos-bank-sampah | 200, urut kode |
| POST | /setoran | 201; 409 noSetoran ganda; 400 tidak valid |
| GET | /setoran | 200 |
| GET | /setoran?jenisSampah=plastik&sort=beratKg | 200, filter + urut menaik; [] bila kosong |
| GET | /setoran/:id | 200 dengan populate kode & nama; 404; 400 bila ID salah |

`.env` tidak disertakan dalam repositori.