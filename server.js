const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Video = require('./models/videoModel');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();

    const categories = {};

    videos.forEach((video) => {
      if (!categories[video.category]) {
        categories[video.category] = [];
      }
      categories[video.category].push(video);
    });

    console.log('Videos by Category:', categories);

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
