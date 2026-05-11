const Joi = require("joi");

const validateUser = (data) => {

  const schema = Joi.object({

    name: Joi.string().required(),

    email: Joi.string().email().required(),

    age: Joi.number(),

    bio: Joi.string().allow(""),

    profileImage: Joi.string().allow("")

  });

  const { error } = schema.validate(data);

  return error ? error.details[0].message : null;
};

module.exports = validateUser;