const express = require('express');
const router = express.Router();
const LikedHistory = require('../models/likesModel');

// GET /api/aggregate/:user_id  사용자의 선호 영상 중 카테고리별 시청 통계
router.get('/aggregate/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log("GET request received for /aggregate/:user_id");
  console.log("User ID:", req.params.user_id);

  if (!user_id) {
    console.log("User ID is missing in request");
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const stats = await LikedHistory.aggregate([
      { $match: { user_id } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log("Aggregation stats:", stats);

    const chartData = stats.map(item => ({
      category: item._id,
      count: item.count,
    }));

    console.log("Chart Data to be sent:", chartData);
    return res.status(200).json(chartData);
  } catch (error) {
    console.error("Error generating category stats:", error);
    return res.status(500).json({ message: "Failed to generate category stats", error });
  }
});

module.exports = router;

