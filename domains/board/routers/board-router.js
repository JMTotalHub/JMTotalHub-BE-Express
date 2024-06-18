import express from 'express';

import boardRouter from './board.router';
import postRouter from './post.router';
import boardPostRouter from './board.post.router';
// import commentRouter from './comment.router';

const router = express.Router();

// 세부 도메인 분류

// 게시판
router.use('/', boardRouter);

// 게시글 (게시글 정보(id) 필요한 경우를 분리 구현)
router.use('/posts', postRouter);
router.use('/:boardId/posts', boardPostRouter);

// // 댓글
// router.use('/comments', commentRouter);

export default router;
