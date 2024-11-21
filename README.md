# 유튜브 쇼츠 제공 플랫폼<br/>

디렉토리 구조<br/>
shorts/<br/>
│<br/>
├── server.js                # 서버 실행 파일<br/>
├── .env                     # 포트번호, DB URI 저장<br/>
├── models/                  # 데이터 모델 폴더<br/>
│   └── videoModel.js        # 비디오 모델 정의<br/>
│   └── watchedModel.js      # 시청기록 저장 모델 정의<br/>
│   └── likesModel.js        # 선호영상 저장 모델 정의<br/>
├── routes/                  # 라우터 폴더<br/>
│   └── videoRoutes.js       # 비디오 관련 라우팅<br/>
│   └── userRoutes.js        # 유저, 시청기록 관련 라우팅<br/>
│   └── aggregateRoutes.js   # 유저의 카테고리별 시청 통계 라우팅<br/>
│   └── likesRoutes.js       # 유저 선호영상 관련 라우팅<br/>
└── config/                  # 설정 폴더<br/>
    └── db.js                # MongoDB 연결 설정<br/>
