const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: String,
  video_id: String,
  category: String,
});

const Video = mongoose.model('Video', VideoSchema, 'recommend');
module.exports = Video;
