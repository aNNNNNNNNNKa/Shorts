const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const videoRoutes = require('./routes/videoRoutes');
const userRoutes = require('./routes/userRoutes');
const aggregateRoutes = require('./routes/aggregateRoutes');
const likesRoutes = require('./routes/likesRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/videos', videoRoutes);
app.use('/api', userRoutes);
app.use('/api/aggregate', aggregateRoutes);
app.use('/api/likes', likesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});