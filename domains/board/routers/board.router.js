import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper.js';

import validationMiddleware from '../../../common/middleware/validation.js';
import * as boardDto from '../dto/board.create-dto';

import * as boardController from '../controllers/board.controller.js';

const boardRouter = express.Router();

// 라우터 함수 매개변수는 (경로, 미들웨어함수, 요청처리함수)
// 1. 경로에는 앞선 app.js의 app 라우터에 이어서  
// 2. 중간 validation 관련 웨어와 DTO를 통해 요청값 인증
// 3. 에러감지 래퍼함수에 감싼 요청처리함수 
boardRouter.get('/', errorWrapper(boardController.boardList));
boardRouter.get('/:boardId', errorWrapper(boardController.boardDetails));
boardRouter.post('/', validationMiddleware(boardDto.boardBodyDto), errorWrapper(boardController.boardAdd));
boardRouter.put('/:boardId', errorWrapper(boardController.boardModify));
boardRouter.delete('/:boardId', errorWrapper(boardController.boardRemove));

export default boardRouter;

