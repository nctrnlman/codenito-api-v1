const Joi = require('joi');

exports.validateMeetingInput = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().iso().required(),
    link: Joi.string().uri().allow(''),
  });

  return schema.validate(data);
};