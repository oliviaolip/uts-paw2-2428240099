require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(); // server baru listen setelah koneksi MongoDB berhasil
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
})();