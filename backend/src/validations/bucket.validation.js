const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createBucket = {
  query: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  })
}

const getUserBuckets = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  })
}

const deleteBucket = {
  query: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  })
}

module.exports = {
  createBucket,
  deleteBucket,
  getUserBuckets,
}
