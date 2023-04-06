const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const commentSchema = {
  type: 'object',
  properties: {
    body: { type: 'string', minLength: 1 },
    author: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    post: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  },
  required: ['body', 'author', 'post'],
  additionalProperties: false,
};

const validateComment = ajv.compile(commentSchema);
module.exports=validateComment