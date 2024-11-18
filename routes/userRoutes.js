const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WatchHistory = require('../models/watchedModel');

// POST /api/watched - 시청 기록 업데이트
router.post('/watched', async (req, res) => {
  const { user_id, video_id } = req.body;

  console.log('Received POST request for /watched');
  console.log('Request body:', req.body);

  if (!user_id || !video_id) {
    console.error('Missing user_id or video_id');
    return res.status(400).json({ message: 'user_id and video_id are required' });
  }

  try {
    // 새 시청 기록 추가
    const newRecord = new WatchHistory({ user_id, video_id });
    await newRecord.save();  // DB에 시청 기록 저장

    console.log('Watch history updated successfully:', newRecord);
    res.status(201).json({ message: 'Watch history updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      // 중복된 데이터가 있을 경우
      console.log('Duplicate entry for user_id and video_id');
      return res.status(400).json({ message: 'Video already in watch history' });
    }

    console.error('Error updating watch history:', error);
    res.status(500).json({ message: 'Error updating watch history', error });
  }
});

// GET /api/watched - 유저의 시청 기록 조회
router.get('/watched/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    // 유저의 시청 기록 조회
    const watchHistory = await WatchHistory.find({ user_id });
    res.status(200).json(watchHistory);
  } catch (error) {
    console.error('Error retrieving watch history:', error);
    res.status(500).json({ message: 'Error retrieving watch history', error });
  }
});

module.exports = router;
