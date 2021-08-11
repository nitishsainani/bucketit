const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUpvote = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  })
}

const didUserUpvote = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  })
}

const deleteUpvote = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  })
}

module.exports = {
  createUpvote,
  deleteUpvote,
  didUserUpvote,
}
