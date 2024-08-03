import express from 'express';

import errorWrapper from '../../../common/error/error-wrapper';

import ChatController from '../controllers/chat.controller';
import jwtAuthMiddleware from '../../../common/auth/jwtAuthMiddleware';

const chatRouter = express.Router();
const chatController = new ChatController();

chatRouter.post(
  '/chat-room',
  jwtAuthMiddleware,
  errorWrapper(chatController.chatRoomAdd)
);

export default chatRouter;
