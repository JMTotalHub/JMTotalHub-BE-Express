import express from 'express';
import * as testController from '../controllers/test.controller'; // 콜백함수에 함수 자체를 건내줘야하니 참조를 전달

const testRouter = express.Router();

testRouter.get('/', testController.testList);
testRouter.post('/', testController.testAdd);
testRouter.put('/:testId', testController.testModify);
testRouter.delete('/:testId', testController.testRemove);

export default testRouter;