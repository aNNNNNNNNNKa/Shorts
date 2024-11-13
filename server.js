const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1); // 연결 실패 시 애플리케이션 종료
    }
};


app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();