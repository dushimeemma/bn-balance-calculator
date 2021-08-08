import Joi from 'joi';

export const BalanceSchema = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().required().messages({
      'any.required': 'Amount is required',
      'number.empty': 'Amount can not be empty',
    }),
    amount_per_day: Joi.number().required().messages({
      'any.required': 'Amount per Day is required',
      'number.empty': 'Amount per Day can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};

export const AmountPerDaySchema = (req, res, next) => {
  const schema = Joi.object({
    amount_per_day: Joi.number().required().messages({
      'any.required': 'Amount per Day is required',
      'number.empty': 'Amount per Day can not be empty',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  return next();
};
