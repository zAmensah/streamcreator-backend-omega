const Joi = require("joi");

exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4),
    phone: Joi.string().required(),
    username: Joi.string(),
    confirm_password: Joi.string(),
  });
  return schema.validate(data);
};

exports.loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.forgotValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().require(),
  });
  return schema.validate(data);
};
