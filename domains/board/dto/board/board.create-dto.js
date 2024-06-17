import Joi from "joi";
// import sanitizeHtml from 'sanitize-html';

// const customJoi = Joi.extend((joi) => ({
//     type: 'string',
//     base: joi.string(),
//     rules: {
//         htmlStrip: {
//             validate(value, helpers) {
//                 const clean = sanitizeHtml(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if (clean !== value) {
//                     return helpers.error('string.htmlStrip', { value });
//                 }
//                 return clean;
//             },
//         },
//     },
// }));

const BoardCreateBodyDto = Joi.object({
    // name: customJoi.string().trim().escapeHTML().max(100).required().messages({
    name: Joi.string().trim().max(100).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.max': 'Name must be at most 100 characters long',
        'any.required': 'Name is required'
    }),
    description: Joi.string().trim().max(500).required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'string.max': 'Description must be at most 500 characters long',
        'any.required': 'Description is required'
    })
});

// DTO 객체
const BoardCreateDto = {
    body: BoardCreateBodyDto,
    query: null,
    params: null
};

export default BoardCreateDto;
