class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found', statusCode = 404) {
        super(statusCode, message);
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Validation error', statusCode = 400) {
        super(statusCode, message);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized', statusCode = 401) {
        super(statusCode, message);
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    ValidationError,
    UnauthorizedError
};
