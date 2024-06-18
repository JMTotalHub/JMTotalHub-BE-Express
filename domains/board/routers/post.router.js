import express from 'express';

import escapeHtmlMiddleware from '../../../common/middleware/escape-html';
import validationMiddleware from '../../../common/middleware/validation';
import errorWrapper from '../../../common/error/error-wrapper';


import * as PostController from '../controllers/post.controller';
import * as PostDto from '../dto/post.dto'

const postRouter = express.Router({ mergeParams: true });

postRouter.post('/:postId',
    errorWrapper(PostController.postDetails));



export default postRouter;
