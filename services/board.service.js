const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findBoardList() {
    return await prisma.board.findMany();
}

async function findBoard(boardId) {
    return await prisma.board.findUnique({
        where: {
            id: Number(boardId)
        }
    })
}

async function createBoard(data) {
    const { name, description } = data;
    return await prisma.board.create({
        data: {
            name,
            description
        }
    });
}

async function updateBoard(boardId, data) {
    const { name, description } = data;
    return await prisma.board.update({
        where: {
            id: Number(boardId)
        },
        data: {
            name,
            description
        }
    });
} 

async function deleteBoard (boardId) {
    return await prisma.board.delete({
        where: {
            id: Number(boardId)
        }
    });
}

module.exports = {
    findBoard,
    findBoardList,
    createBoard,
    updateBoard,
    deleteBoard
}