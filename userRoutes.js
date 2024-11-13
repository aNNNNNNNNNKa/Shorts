const express = require('express');
const User = require('../models/watchedModel');
const Video = require('../models/videoModel');
const router = express.Router();

router.post('/:userId/watched', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { video_id } = req.body;

    const video = await Video.findOne({ video_id });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.watched_videos.push(video._id);
    await user.save();

    res.status(200).json({ message: 'Video added to watched history' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving watched video', error: err });
  }
});

router.get('/:userId/watched', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('watched_videos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.watched_videos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching watched videos', error: err });
  }
});

module.exports = router;
