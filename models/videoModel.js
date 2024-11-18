const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video_id: { type: String, required: true },
  category: { type: String, required: true },
  // 다른 필드들 추가 가능
});

const Video = mongoose.model('Video', videoSchema, 'recommend');

module.exports = Video;