const express = require('express');
const router = express.Router();
const WatchHistory = require('../models/watchedModel');

// GET /api/aggregate/:user_id  사용자의 카테고리별 시청 통계
router.get('/aggregate/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const stats = await WatchHistory.aggregate([
      { $match: { user_id } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const top3 = stats.slice(0, 3);
    const othersCount = stats.slice(3).reduce((acc, cur) => acc + cur.count, 0);

    const chartData = top3.map(item => ({
      category: item._id,
      count: item.count,
    }));

    if (othersCount > 0) {
      chartData.push({ category: "기타", count: othersCount });
    }

    res.status(200).json(chartData);
  } catch (error) {
    console.error("Error generating category stats:", error);
    res.status(500).json({ message: "Failed to generate category stats", error });
  }
});

module.exports = router;
