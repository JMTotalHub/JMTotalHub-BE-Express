import { body, param } from 'express-validator';

// 요청 본문(body) 검증
const boardBodyDto = [
    body('name')
        .trim()
        .escape()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be String')
        .isLength({ max: 100 }).withMessage('Name  must be at most 100 characters long'),
    body('description')
        .escape()
        .notEmpty().withMessage('description is required')
        .isString().withMessage('description must be String')
        .isLength({ max: 500 }).withMessage('description must be at most 50 characters long')
];

// // URL 파라미터 검증
// const BoardParamDto = [
//     param('id')
//         .isUUID().withMessage('ID must be a valid UUID')
// ];

export { 
    boardBodyDto, 
    // BoardParamDto
}
