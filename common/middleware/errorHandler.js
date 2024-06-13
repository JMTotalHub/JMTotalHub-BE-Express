const { CustomError } = require('../error/customErrors');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = errorHandler;
