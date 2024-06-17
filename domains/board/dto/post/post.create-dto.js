// import Joi from "joi";

// const sanitizeHtml = require('sanitize-html');
// const Joi-Valid = require('joi-sanitize-html')(Joi, sanitizeHtml);

// const PostCreateBodyDto = Joi.object({
//     title: Joi.string().trim().escapeHTML().max(100).required().message({
//         'string.base': 'Title must be a string',
//         'string.empty': 'Title is require',
//         'string.max': 'Title must be at most 100 characters long',
//         'any.required': 'Name is required'
//     }),
//     content: Joi.string().trim().escapeHTML().max(65535).required().message({
//         'string.base': 'Content must be a string',
//         'string.empty': 'Content is require',
//         'string.max': 'Content must be at most 100 characters long',
//         'any.required': 'Content is required'
//     })
// })