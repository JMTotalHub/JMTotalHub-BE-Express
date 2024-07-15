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

// �Ʒ� Redis �׽�Ʈ
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
  

// Redis���� ���� �������� �Լ�
const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  };
  
  // Redis�� ���� �����ϴ� �Լ�
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