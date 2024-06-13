import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper.js';

import validation from '../../../common/middleware/validation.js';
import * as boardDto from '../dto/board.dto.js';

import * as boardController from '../controllers/board.controller.js';

const boardRouter = express.Router();

boardRouter.get('/', errorWrapper(boardController.boardList));
boardRouter.get('/:boardId', errorWrapper(boardController.boardDetails));
boardRouter.post('/', validation(boardDto.BoardCreateDto), errorWrapper(boardController.boardAdd));
boardRouter.put('/:boardId', errorWrapper(boardController.boardModify));
boardRouter.delete('/:boardId', errorWrapper(boardController.boardRemove));

export default boardRouter;

