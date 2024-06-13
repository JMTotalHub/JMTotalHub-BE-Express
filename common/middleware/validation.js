import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

function validation(dtoType) {
    return async (req, res, next) => {
        const dtoInstance = plainToInstance(dtoType, req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints)).flat();
            return res.status(400).json({ message: 'Validation error', errors: errorMessages });
        }

        req.body = dtoInstance;
        next();
    };
}

export default validation;
