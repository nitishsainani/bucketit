const { User, Category, Product, Upvote, Comment, Bucket } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const {getUserById} = require('./user.service');
const { getCategoryById } = require('./category.service')


const createProduct = async (productBody) => {
  if (await Product.isTitleTaken(productBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return await Product.create(productBody);
};

const getProductById = async (id) => {
  return Product
    .findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .populate('upvotes')
    .populate('buckets')
    .populate('categories')
    .populate('submittedBy');
};

const queryProducts = async (search, categoriesList, filter, options) => {
  let products = Product.find({verified: true});
  if(categoriesList && categoriesList.length > 0) {
    products = products.find({'$or': categoriesList.map(category => {return {categories: category}})})
  }
  options.customQuerySet = products;
  options.populate = 'upvotes,comments,buckets,categories';
  products = search ? products.find({title: { "$regex": search, "$options": "i" }}) : products
  return await Product.paginate(filter, options, products);
};

const updateProduct = async (product, updateBody) => {
  if (updateBody.title && (await Product.isTitleTaken(updateBody.title, product._id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await Bucket.remove({product});
  await Upvote.remove({product});
  await Comment.remove({product});
  await product.remove();
  return product;
};

module.exports = {
  getProductById,
  queryProducts,
  createProduct,
  updateProduct,
  deleteProductById,
}
