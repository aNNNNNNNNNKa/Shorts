const mongoose = require('mongoose');

const likedSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  video_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  }
);

// user_id와 video_id가 중복되지 않도록 유니크 인덱스 생성
likedSchema.index({ user_id: 1, video_id: 1, category: 1 }, { unique: true });

const LikedHistory = mongoose.model('LikedHistory', likedSchema);

module.exports = LikedHistory;
