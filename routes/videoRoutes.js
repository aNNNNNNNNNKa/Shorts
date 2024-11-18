const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel');

// 랜덤 비디오 요청 (GET)
router.get('/random', async (req, res) => {
  try {
    console.log("Request received at /api/videos/random");

    // 모든 카테고리를 가져옴
    const categories = await Video.distinct('category');
    if (!categories.length) {
      console.warn("No categories found in the database");
      return res.status(404).json({ message: "No categories found" });
    }
    console.log("Categories found:", categories);

    const randomVideos = [];

    // 각 카테고리에서 랜덤 비디오 하나를 가져옴
    for (const category of categories) {
      const randomVideo = await Video.aggregate([
        { $match: { category: category } },
        { $sample: { size: 1 } },
      ]);

      if (randomVideo.length > 0) {
        randomVideos.push(randomVideo[0]);
      }
    }

    if (!randomVideos.length) {
      console.warn("No videos found for any category");
      return res.status(404).json({ message: "No videos found" });
    }

    res.status(200).json(randomVideos);  // 랜덤 비디오 리스트 응답
  } catch (error) {
    console.error("Error fetching random videos:", error);
    res.status(500).json({ message: "Failed to fetch random videos" });
  }
});

// 카테고리별 비디오 요청 (POST)
router.post('/new', async (req, res) => {
  const { category } = req.body;

  console.log('Received POST request for /api/videos/new');
  console.log('Category:', category);

  if (!category || typeof category !== 'string') {
    console.error('Invalid category');
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    // 카테고리별로 비디오를 찾음
    const videos = await Video.find({ category });

    if (videos.length === 0) {
      console.log(`No videos found for category: ${category}`);
      return res.status(404).json({ message: `No videos found for category: ${category}` });
    }

    console.log(`Found ${videos.length} videos for category: ${category}`);
    res.status(200).json(videos);  // 카테고리 비디오 리스트 응답
  } catch (error) {
    console.error('Error retrieving videos:', error);
    res.status(500).json({ message: 'Error retrieving videos', error });
  }
});

module.exports = router;
