const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel'); // 비디오 모델

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    const videoData = videos.map(video => ({
      video_id: video.video_id,
      title: video.title,
    }));
    res.json(videoData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching videos', error: err });
  }
});

module.exports = router;