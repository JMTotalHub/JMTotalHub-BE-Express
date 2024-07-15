import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findTestList () {
    return await prisma.test.findMany();
} 

async function createTest (data) {
    const { title, content } = data;
    return await prisma.test.create({
        data: {
          title,
          content,
        },
    });
}

async function updateTest (testId, data) {
    const { title, content } = data;
    return await prisma.test.update({
        where: {
            id: Number(testId),
        },
        data: {
            title,
            content,
        },
    });
}

async function deleteTest (testId) {
    return await prisma.test.delete({
        where: {
            id: Number(testId),
        }
    });
}

// 아래 Redis 테스트
import dotenv from 'dotenv';

dotenv.config();

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
  });
  

// Redis에서 값을 가져오는 함수
const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  };
  
  // Redis에 값을 설정하는 함수
  const setToCache = (key, value) => {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };


export {
    findTestList,
    createTest,
    updateTest,
    deleteTest,
    getFromCache,
    setToCache
}