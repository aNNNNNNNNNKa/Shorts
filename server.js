const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// 비디오 모델 정의
const VideoSchema = new mongoose.Schema({
  video_id: String,
});
const Watched = mongoose.model('Watched', VideoSchema);
const Recommend = mongoose.model('Recommend', VideoSchema);

// GraphQL 스키마 정의
const typeDefs = gql`
  type Video {
    video_id: String
  }
`;

// GraphQL 리졸버 정의
const resolvers = {
  Query: {
    // 추천 비디오 목록 가져오기
    recommendedVideos: async () => {
      try {
        return await Recommend.find();
      } catch (error) {
        throw new Error('Failed to fetch recommended videos');
      }
    }
  },
  Mutation: {
    // 시청한 비디오 저장
    saveWatchedVideo: async (_, { video_id }) => {
      try {
        const watchedVideo = new Watched({ video_id });
        await watchedVideo.save();
        return watchedVideo;
      } catch (error) {
        throw new Error('Failed to save watched video');
      }
    }
  }
};

// Apollo Server 설정
const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`GraphQL playground available at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
