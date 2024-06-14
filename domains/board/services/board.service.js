/**
 * ======================================================================
 * @파일    board.service.js
 * @담당    박준모
 * @생성일  2024-06-12
 * @수정일  2024-06-14 
 * @기능    board(게시판) 관련 서비스로직 모듈
 * @설명    
 * ---
 * ======================================================================
 */

import * as BoardRepository from '../repositories/board.repository'

import * as CustomError from '../../../common/error/custom-errors';
import { isPrismaError, handlePrismaError } from '../../../common/handler/error.prisma'; 


async function findBoardList() {
    try {
        return await BoardRepository.findBoardList();
    } catch (error) {
        if (isPrismaError(error)) {
            handlePrismaError(error);
        } else {
            throw new CustomError.DataBaseError('알 수 없는 데이터베이스 오류');
        }
    }
}

async function findBoard(boardId) {
    // try {
    //     return await BoardRepository.findBoardById(boardId);
    // } catch (error) {
    //     if (isPrismaError(error)) {
    //         handlePrismaError(error);
    //     } else {
    //         throw new CustomError.DataBaseError('알 수 없는 데이터베이스 오류');
    //     }
    // }
    return await BoardRepository.findBoardById(boardId);

}

async function createBoard(data) {
    try {
        return await BoardRepository.insertBoard(data);
    } catch (error) {
        if (isPrismaError(error)) {
            handlePrismaError(error);
        } else {
            throw new CustomError.DataBaseError('알 수 없는 데이터베이스 오류');
        }
    }
}

async function updateBoard(boardId, data) {
    // try {
    //     return await BoardRepository.updateBoard(boardId, data);
    // } catch (error) {
    //     if (isPrismaError(error)) {
    //         handlePrismaError(error);
    //     } else {
    //         throw new CustomError.DataBaseError('알 수 없는 데이터베이스 오류');
    //     }
    // }


    return await BoardRepository.updateBoard(boardId, data);

} 

async function deleteBoard (boardId) {
    try {
        return BoardRepository.deleteBoard();
    } catch (error) {
        if (isPrismaError(error)) {
            handlePrismaError(error);
        } else {
            throw new CustomError.DataBaseError('알 수 없는 데이터베이스 오류');
        }
    }
}

export {
    findBoard,
    findBoardList,
    createBoard,
    updateBoard,
    deleteBoard
}