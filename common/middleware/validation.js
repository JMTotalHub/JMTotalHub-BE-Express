import { validationResult } from 'express-validator';

// 병렬 처리
const validationMiddleware = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const formattedErrors = errors.array().map(err => ({
            'target field': err.path,
            'field location': err.location,
            'message': err.msg
        }));

        // res.status(400).json({ errors: errors.array() });
        res.status(400).json({ errors: formattedErrors });

    };
};

export default validationMiddleware;