const Ajv = require('ajv');

// Create a new Ajv instance
const ajv = new Ajv();

function validateRequestBody(schema) {
  return function(req, res, next) {
    const isValid = ajv.validate(schema, req.body);
    if (!isValid) {
      const errors = ajv.errors.map(error => {
        return {
          code: 'InvalidArgumentError',
          message: `${error.dataPath} ${error.message}`,
        };
      });
      return next(new errors.InvalidArgumentError({ errors }));
    }
    return next();
  };
}