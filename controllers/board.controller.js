const boardService = require('../services/board.service')

async function boardList(req, res) {
    try {
        const boardList = await boardService.findBoardList();
        res.status(200).json(boardList);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve boardList data',
            errorMessage: error.message
        })
    }
}

async function boardDetails(req, res) {
    try {
        const { boardId } = req.params;
        const board = await boardService.findBoard(boardId);
        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve board data',
            errorMessage: error.message
        })
    }
}

async function boardAdd(req, res) {
    try {
        const boardData  = req.body;
        const createdBoard = await boardService.createBoard(boardData)
        res.status(201).json(createdBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create board data',
            errorMessage: error.message
        })
    }
}

async function boardModify(req, res) {
    try {
        const { boardId } = req.params;
        const boardData  = req.body;
        const updatedBoard = await boardService.updateBoard(boardId, boardData);
        res.status(200).json(updatedBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update board data',
            errorMessage: error.message
        })
    }
}

async function boardRemove(req, res) {
    try {
        const { boardId } = req.params;
        await boardService.deleteBoard(boardId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete board data',
            errorMessage: error.message
        })
    }
}

module.exports = {
    boardList,
    boardDetails,
    boardAdd,
    boardModify,
    boardRemove
}