/*
require('dotenv').config(); // .env 파일에서 환경 변수를 로드

const express = require('express');
const mongoose = require('mongoose');
const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

// 요청 본문을 JSON 형식으로 파싱
app.use(express.json());

// 라우터 설정
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

// MongoDB 연결
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
*/