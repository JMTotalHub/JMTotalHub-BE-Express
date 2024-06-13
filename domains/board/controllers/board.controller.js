const boardService = require('../services/board.service')

async function boardList(req, res) {
    const boardList = await boardService.findBoardList();
    res.status(200).json(boardList);
}

async function boardDetails(req, res) {
    const { boardId } = req.params;
    const board = await boardService.findBoard(boardId);
    res.status(200).json(board);
}

async function boardAdd(req, res) {
    const boardData  = req.body;
    const createdBoard = await boardService.createBoard(boardData)
    res.status(201).json(createdBoard);
}

async function boardModify(req, res) {
    const { boardId } = req.params;
    const boardData  = req.body;
    const updatedBoard = await boardService.updateBoard(boardId, boardData);
    res.status(200).json(updatedBoard);
}

async function boardRemove(req, res) {
    const { boardId } = req.params;
    await boardService.deleteBoard(boardId);
    res.status(204).send();
}

module.exports = {
    boardList,
    boardDetails,
    boardAdd,
    boardModify,
    boardRemove
}