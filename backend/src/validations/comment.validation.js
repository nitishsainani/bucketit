const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    text: Joi.string().required(),
  })
}

const getComments = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const updateComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    text: Joi.string().required(),
  })
}

const deleteComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  })
}

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
}
