const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LikedHistory = require('../models/likesModel');

// POST /api/likes - 유저의 선호 영상 업데이트
router.post('/', async (req, res) => {
  const { user_id, video_id, category } = req.body;

  console.log('Received POST request for /likes');
  console.log('Request body:', req.body);

  if (!user_id || !video_id || !category) {
    console.error('Missing user_id or video_id or category');
    return res.status(400).json({ message: 'user_id, video_id and category are required' });
  }

  try {
    const newRecord = new LikedHistory({ user_id, video_id, category });
    await newRecord.save();
    console.log('Like history updated successfully:', newRecord);
    res.status(201).json({ message: 'Like history updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      console.log('Duplicate entry for user_id, video_id and category');
      return res.status(400).json({ message: 'Video already in like history' });
    }

    console.error('Error updating like history:', error);
    res.status(500).json({ message: 'Error updating like history', error });
  }
});

// GET /api/likes - 유저의 선호 영상 조회
router.get('/likes/:user_id', async (req, res) => {
  const { user_id } = req.params;
  

  try {
    const likedHistory = await LikedHistory.find({ user_id });
    res.status(200).json(likedHistory);
  } catch (error) {
    console.error('Error retrieving like history:', error);
    res.status(500).json({ message: 'Error retrieving like history', error });
  }
});

module.exports = router;
