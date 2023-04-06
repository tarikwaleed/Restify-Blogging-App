const Ajv = require('ajv');
const ajv = new Ajv();
const authorSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 1 },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
};
const validateAuthor = ajv.compile(authorSchema);
module.exports = validateAuthor;