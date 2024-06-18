import express from 'express';

import escapeHtmlMiddleware from '../../../common/middleware/escape-html';
import validationMiddleware from '../../../common/middleware/validation';
import errorWrapper from '../../../common/error/error-wrapper';


import * as PostController from '../controllers/post.controller';
import * as PostDto from '../dto/post.dto'

const postRouter = express.Router({ mergeParams: true });

postRouter.get('/:postId',
    errorWrapper(PostController.postDetails));

postRouter.put('/:postId',
    escapeHtmlMiddleware,
    validationMiddleware(PostDto.PostUpdateDto),
    errorWrapper(PostController.postModify)
)

postRouter.delete('/:postId',
    errorWrapper(PostController.postRemove)
)

export default postRouter;
