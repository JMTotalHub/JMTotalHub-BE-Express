const express = require('express')
const errorWrapper = require('../../../common/error/errorWrapper')

const boardRouter = express.Router();
const boardController = require("../controllers/board.controller");

boardRouter.get('/', errorWrapper(boardController.boardList));
boardRouter.get('/:boardId', errorWrapper(boardController.boardDetails));
boardRouter.post('/', errorWrapper(boardController.boardAdd));
boardRouter.put('/:boardId', errorWrapper(boardController.boardModify));
boardRouter.delete('/:boardId', errorWrapper(boardController.boardRemove));

module.exports = boardRouter;