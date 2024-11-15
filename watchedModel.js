const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  video_id: { type: String, required: true },
  watchedAt: { type: Date, default: Date.now }
});

const Watched = mongoose.model('Watched', watchedSchema);
module.exports = Watched;