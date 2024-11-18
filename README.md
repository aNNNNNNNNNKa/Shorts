# 유튜브 쇼츠 제공 플랫폼

디렉토리 구조(app.js는 부활가능)
shorts/
│
├── server.js                # 서버 실행 파일
├── .env                     # 포트번호, DB URI 저장
├── models/                  # 데이터 모델 폴더
│   └── videoModel.js        # 비디오 모델 정의
│   └── watchedModel.js      # 시청기록 저장 모델 정의
├── routes/                  # 라우터 폴더
│   └── videoRoutes.js       # 비디오 관련 라우팅
│   └── userRoutes.js        # 유저, 시청기록 관련 라우팅
└── config/                  # 설정 폴더
    └── db.js                # MongoDB 연결 설정
