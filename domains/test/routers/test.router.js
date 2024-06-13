const express = require('express')

const testRouter = express.Router();
const testController = require('../controllers/test.controller') 

testRouter.get('/', testController.testList);
testRouter.post('/', testController.testAdd);
testRouter.put('/:testId', testController.testModify);
testRouter.delete('/:testId', testController.testRemove);

module.exports = testRouter;