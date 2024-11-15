const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  video_id: String,
  title: String,
  category: String,
});

module.exports = mongoose.model('Video', videoSchema, 'recommend');
