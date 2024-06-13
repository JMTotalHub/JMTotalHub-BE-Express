const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

// 미들웨어
app.use(express.json());
app.use(cors());

// 라우터
const testRouter = require('./domains/test/routers/test.router');
const boardRouter = require('./domains/board/routers/board.router');
// const postRouter = require();
app.use('/tests', testRouter);
app.use('/boards', boardRouter);

// 예외처리 미들웨어
const errorHandler = require('./common/middleware/errorHandler');
app.use(errorHandler);

// 서버구동
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});