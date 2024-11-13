const mongoose = require('mongoose');

// 비디오 모델 정의
const videoSchema = new mongoose.Schema({
  video_id: { type: String, required: true },  // 유니크한 video_id
  title: { type: String, required: true },     // 비디오 제목
  description: { type: String },               // 비디오 설명           // 썸네일 URL
  category: { type: String },                  // 카테고리 (예: Game, Kpop 등)
  keywords: [String]                        // 관련 키워드
});

// 비디오 모델 내보내기
module.exports = mongoose.model('Video', videoSchema);
