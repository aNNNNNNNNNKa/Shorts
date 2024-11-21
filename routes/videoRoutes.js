const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel');
const WatchHistory = require('../models/watchedModel')

// GET /api/videos/random 랜덤 비디오 요청
router.get('/random', async (req, res) => {
  const userId = req.query.user_id;

  try {
    const watchedVideos = await WatchHistory.find({ user_id: userId }).select('video_id');
    const watchedVideoIds = watchedVideos.map((record) => record.video_id);

    const randomVideos = await Video.aggregate([
      { $match: { video_id: { $nin: watchedVideoIds } } },
      { $sample: { size: 10 } },
    ]);

    if (randomVideos.length === 0) {
      console.log('No videos available for recommendation.');
      return res.status(404).json({ message: 'No videos available' });
    }

    randomVideos.forEach(video => {
      console.log(`Sent Random Video - Title: ${video.title}, Video ID: ${video.video_id}, User ID: ${userId}`);
    });

    res.status(200).json(randomVideos);
  } catch (error) {
    console.error('Error fetching random video:', error);
    res.status(500).json({ message: 'Error fetching random video', error });
  }
});


// POST /api/videos/new 카테고리별 비디오 요청
router.post('/new', async (req, res) => {
  const { category } = req.body;

  console.log('Received POST request for /api/videos/new');
  console.log('Category:', category);

  if (!category || typeof category !== 'string') {
    console.error('Invalid category');
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const videos = await Video.find({ category });

    if (videos.length === 0) {
      console.log(`No videos found for category: ${category}`);
      return res.status(404).json({ message: `No videos found for category: ${category}` });
    }

    console.log(`Found ${videos.length} videos for category: ${category}`);
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error retrieving videos:', error);
    res.status(500).json({ message: 'Error retrieving videos', error });
  }
});

module.exports = router;