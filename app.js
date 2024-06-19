import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 환경 변수 설정
dotenv.config();

// app
const app = express();

// 미들웨어
app.use(express.json());
app.use(cors());

// 라우터 (도메인 분류)
import testRouter from './domains/test/routers/test.router.js';
import boardRouter from './domains/board/routers';
app.use('/tests', testRouter);
app.use('/boards', boardRouter);


// 예외처리 미들웨어
import errorHandler from './common/handler/error.js';
app.use(errorHandler);

// 서버구동
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 테스트 코드에서 사용할 app 객체를 모듈로 내보냄
export default app;