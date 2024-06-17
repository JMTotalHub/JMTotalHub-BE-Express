const validationMiddleware = (dto) => {
    return (req, res, next) => {
        const { body, query, params } = dto;
        const errors = [];

        if (body) {
            const { error: bodyError } = body.validate(req.body, { abortEarly: false });
            if (bodyError) {
                console.log(bodyError);
                bodyError.details.forEach(detail => {
                    errors.push({
                        field_type: 'body',
                        field_name: detail.path.join('.'),
                        message: detail.message
                    });
                });
            }
        }

        if (query) {
            const { error: queryError } = query.validate(req.query, { abortEarly: false });
            if (queryError) {
                queryError.details.forEach(detail => {
                    errors.push({
                        field_type: 'query',
                        field_name: detail.path.join('.'),
                        message: detail.message
                    });
                });
            }
        }

        if (params) {
            const { error: paramsError } = params.validate(req.params, { abortEarly: false });
            if (paramsError) {
                paramsError.details.forEach(detail => {
                    errors.push({
                        field_type: 'params',
                        field_name: detail.path.join('.'),
                        message: detail.message
                    });
                });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
};

export default validationMiddleware;
