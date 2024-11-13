const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel'); // 비디오 모델
const Watched = require('../models/watchedModel'); // watched 모델

// 비디오 목록 조회 (watched에 포함되지 않은 비디오만 반환)
router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query; // 프론트엔드에서 전달하는 사용자 ID

    // watched에 저장된 비디오 목록을 가져옵니다.
    const watchedVideos = await Watched.find({ user_id }).select('video_id');
    const watchedVideoIds = watchedVideos.map(watched => watched.video_id);

    // watched에 포함되지 않은 비디오를 DB에서 조회
    const videos = await Video.find({ video_id: { $nin: watchedVideoIds } }).limit(10);
    
    res.status(200).json(videos); // 비디오 목록 반환
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

// 사용자가 본 비디오 기록 저장
router.post('/watched', async (req, res) => {
  const { user_id, video_id } = req.body;

  try {
    // watched 컬렉션에 비디오 기록 저장
    const newWatched = new Watched({ user_id, video_id });
    await newWatched.save();
    
    res.status(201).json({ message: 'Video watched recorded' }); // 성공 메시지
  } catch (error) {
    res.status(500).json({ message: 'Error saving watched video' });
  }
});

// 새로운 비디오 추가
router.post('/', async (req, res) => {
  const { video_id, title, description, thumbnail_url, category, keywords } = req.body;

  try {
    const newVideo = new Video({
      video_id,
      title,
      description,
      thumbnail_url,
      category,
      keywords
    });

    await newVideo.save();
    res.status(201).json(newVideo); // 비디오 데이터 반환
  } catch (error) {
    res.status(500).json({ message: 'Error saving video' });
  }
});

module.exports = router;
