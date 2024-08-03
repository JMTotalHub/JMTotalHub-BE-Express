import express from 'express';

import errorWrapper from '../../../common/error/error-wrapper';

import ChatController from '../controllers/chat.controller';

const chatRouter = express.Router();

chatRouter.post('/chat-room', errorWrapper(ChatController));

export default chatRouter;
