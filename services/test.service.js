const { PrismaClient } = require('@prisma/client');

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


module.exports = {
    findTestList,
    createTest,
    updateTest,
    deleteTest
}