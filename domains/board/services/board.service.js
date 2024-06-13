const { PrismaClient } = require('@prisma/client');
const { NotFoundError } = require('../../../common/error/customErrors')

const prisma = new PrismaClient();

async function findBoardList() {
    return await prisma.board.findMany();
}

async function findBoard(boardId) {

    const board = await prisma.board.findUnique({
        where: {
            id: Number(boardId)
        }
    });

    if (!board) {
        throw new NotFoundError('해당 ID의 게시판을 찾을 수 없습니다.');
    }

    return board;
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