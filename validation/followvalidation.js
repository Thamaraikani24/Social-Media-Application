const Joi = require("joi");

const validateFollowRequest = (data) => {

  const schema = Joi.object({
    requesterId: Joi.string().required()
  });

  const { error } = schema.validate(data);

  return error ? error.details[0].message : null;
};

module.exports = validateFollowRequest;