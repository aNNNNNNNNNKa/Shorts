const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// user_id와 video_id가 중복되지 않도록 유니크 인덱스 생성
watchedSchema.index({ user_id: 1, video_id: 1 }, { unique: true });

const WatchHistory = mongoose.model('WatchHistory', watchedSchema);

module.exports = WatchHistory;
