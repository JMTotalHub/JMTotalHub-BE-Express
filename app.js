import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';

// 환경 변수 설정
dotenv.config();

// app
const app = express();

// 미들웨어
app.use(express.json());
app.use(cors());

// 라우터
import testRouter from './domains/test/routers/test.router.js';
import boardRouter from './domains/board/routers/board.router.js';
app.use('/tests', testRouter);
app.use('/boards', boardRouter);

// 예외처리 미들웨어
import errorHandler from './common/middleware/error-handler.js';
app.use(errorHandler);

// 서버구동
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});