const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    categories: Joi.array().items(Joi.string().custom(objectId)).required(),
    title: Joi.string().required(),
    tagline: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().required(),
    website: Joi.string().uri().required(),
    appLink: Joi.string().uri().required(),
  })
}

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    search: Joi.string().min(3),
    categories: Joi.string(),
    verified: Joi.bool(),
    submittedBy: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      categories: Joi.array().items(Joi.string().custom(objectId)),
      title: Joi.string(),
      tagline: Joi.string(),
      description: Joi.string(),
      logo: Joi.string(),
      website: Joi.string().uri(),
      appLink: Joi.string().uri(),
    })
    .min(1)
}

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct
}
