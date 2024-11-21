const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video_id: { type: String, required: true },
  category: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema, 'recommend');

module.exports = Video;