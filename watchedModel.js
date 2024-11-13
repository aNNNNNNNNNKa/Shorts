const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  video_id: { type: String, required: true },
  watchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Watched', watchedSchema);
