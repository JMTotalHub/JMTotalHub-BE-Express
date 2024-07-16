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
import { createClient } from 'redis';

dotenv.config();

// Redis Ŭ���̾�Ʈ ����
const redisClient = createClient({
  url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

// Redis ����
redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

// Redis�� ����ϴ� �Լ�
async function getFromCache(key) {
  try {
    const data = await redisClient.get(key);
    return data;
  } catch (err) {
    console.error('Error getting data from Redis:', err);
    throw err;
  }
}

async function setToCache(key, value) {
  try {
    await redisClient.set(key, value);
  } catch (err) {
    console.error('Error setting data in Redis:', err);
    throw err;
  }
}


export {
    findTestList,
    createTest,
    updateTest,
    deleteTest,
    getFromCache,
    setToCache
}