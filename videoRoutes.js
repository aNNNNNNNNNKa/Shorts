const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel');

router.get('/random', async (req, res) => {
  try {
    console.log("Request received at /api/videos/random");

    const categories = await Video.distinct('category');
    if (!categories.length) {
      console.warn("No categories found in the database");
      return res.status(404).json({ message: "No categories found" });
    }
    console.log("Categories found:", categories);

    const randomVideos = [];

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

    randomVideos.forEach(video => {
      console.log(`Random Video: Title - ${video.title}, Video ID - ${video.video_id}, Category - ${video.category}`);
    });

    res.status(200).json(randomVideos);
  } catch (error) {
    console.error("Error fetching random videos:", error);
    res.status(500).json({ message: "Failed to fetch random videos" });
  }
});

module.exports = router;
