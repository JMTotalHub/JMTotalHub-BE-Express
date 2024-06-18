// import express from 'express';

// import errorWrapper from '../../../common/error/error-wrapper';
// import validationMiddleware from '../../../common/middleware/validation';

// import * as postController from '../controllers/post.controller';
// import * as PostDto from '../dto/post.dto'

// const postRouter = express.Router({ mergeParams: true });

// // 라우터 함수 매개변수는 (경로, 미들웨어함수, 요청처리함수)
// // 1. 경로에는 앞선 app.js의 app 라우터에 이어서
// // 2. 중간 validation 관련 웨어와 DTO를 통해 요청값 인증
// // 3. 에러감지 래퍼함수에 감싼 요청처리함수

// postRouter.post('/', validationMiddleware())

// export default postRouter;
