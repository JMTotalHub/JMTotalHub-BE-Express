import express from 'express';

import escapeHtmlMiddleware from '../../../common/middleware/escape-html';
import validationMiddleware from '../../../common/middleware/validation';
import errorWrapper from '../../../common/error/error-wrapper';

import * as PostController from '../controllers/board.post.controller';
import * as PostDto from '../dto/post.dto';

const boardPostRouter = express.Router({ mergeParams: true });


boardPostRouter.get('/',
    validationMiddleware(PostDto.BoardPostListDto),
    errorWrapper(PostController.postList)
);

boardPostRouter.post('/',
    escapeHtmlMiddleware,
    validationMiddleware(PostDto.PostCreateDto),
    errorWrapper(PostController.postAdd)
);

export default boardPostRouter;