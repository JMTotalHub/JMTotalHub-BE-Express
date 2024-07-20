import express from 'express';
import errorWrapper from '../../../common/error/error-wrapper';

import * as AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/sign-up', errorWrapper(AuthController.userSingUp));

authRouter.post('/sign-in', errorWrapper(AuthController.userSingUp));

export default authRouter;
