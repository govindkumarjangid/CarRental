import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
    try {
        const validatedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        if (validatedData.body) req.body = validatedData.body;
        if (validatedData.query) {
            Object.keys(req.query).forEach(k => delete req.query[k]);
            Object.assign(req.query, validatedData.query);
        }
        if (validatedData.params) {
            Object.keys(req.params).forEach(k => delete req.params[k]);
            Object.assign(req.params, validatedData.params);
        }

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errorMessages
            });
        }
        next(error);
    }
};
