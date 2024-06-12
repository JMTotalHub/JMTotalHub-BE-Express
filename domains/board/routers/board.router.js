const express = require('express')

const boardRouter = express.Router();
const boardController = require("../controllers/board.controller");

boardRouter.get('/', boardController.boardList);
boardRouter.get('/:boardId', boardController.boardDetails);
boardRouter.post('/', boardController.boardAdd);
boardRouter.put('/:boardId', boardController.boardModify);
boardRouter.delete('/:boardId', boardController.boardRemove);

module.exports = boardRouter;