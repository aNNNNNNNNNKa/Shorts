const express = require('express');
const User = require('../models/watchedModel');
const Video = require('../models/videoModel');
const router = express.Router();

router.post('/watched', async (req, res) => {
  const { username, video_id } = req.body;

  if (!username || !video_id) {
    return res.status(400).json({ error: 'Username and video_id are required.' });
  }

  try {
    let userWatched = await Watched.findOne({ user: username });

    if (!userWatched) {
      userWatched = new Watched({
        user: username,
        videos: [video_id],
      });
    } else {
      if (!userWatched.videos.includes(video_id)) {
        userWatched.videos.push(video_id);
      }
    }

    await userWatched.save();

    res.status(200).json({ message: 'Video added to watched list.' });
  } catch (error) {
    console.error('Error saving watched video:', error);
    res.status(500).json({ error: 'Failed to save watched video.' });
  }
});

module.exports = router;