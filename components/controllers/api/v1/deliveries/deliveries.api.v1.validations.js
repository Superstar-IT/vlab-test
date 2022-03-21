
// imports
import Joi from '@hapi/joi'

// export
export default {
  'mainGet': Joi.object({
    "dateFrom": Joi.date().iso().optional(),
    "dateTo": Joi.date().iso().optional().when('dateFrom', { is: Joi.exist(), then: Joi.date().iso().min(Joi.ref('dateFrom')) }),
    "weight": Joi.number().optional().min(0),
    "page": Joi.number().optional().min(1),
    "limit": Joi.number().optional().min(1),
  }),
  'mainPost': Joi.object({
    "when": Joi.string().isoDate().required(),
    "origin": Joi.object({
      "street": Joi.string().max(150).required().trim(),
      "number": Joi.string().max(10).required().trim(),
      "city": Joi.string().max(50).required().trim(),
      "postalCode": Joi.string().max(10).required().trim(),
    }).required(),
    "destination": Joi.object({
      "street": Joi.string().max(150).required().trim(),
      "number": Joi.string().max(10).required().trim(),
      "city": Joi.string().max(50).required().trim(),
      "postalCode": Joi.string().max(10).required().trim(),
    }).required(),
    "products": Joi.array()
      .items(Joi.string().alphanum().min(24).max(24).required().trim())
      .min(1).required(),
  }),
  'getOne': Joi.object({
    "id": Joi.string().alphanum().min(24).max(24),
  }),
}
