const Ajv = require('ajv');
const ajv = new Ajv();
const postSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    body: { type: 'string', minLength: 1 },
    author: { type: 'string', minLength: 1 }
  },
  required: ['title', 'body', 'author']
};
const validatePost = ajv.compile(postSchema);
module.exports = validatePost;
