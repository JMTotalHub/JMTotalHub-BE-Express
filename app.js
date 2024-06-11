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
const testRouter = require('./routes/test.router')
app.use('/tests', testRouter);

// 서버구동
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});