const { User, Category, Product, Comment, Bucket } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const {getUserById} = require('./user.service');
const { getCategoryById } = require('./category.service');
const { getProductById } = require('./product.service');


const bucketProduct = async (userId, productId) => {
  let product = await getProductById(productId);
  if(!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found.')
  }
  if(await Bucket.didUserAlreadyBucket(userId, productId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already bucketed this Product.')
  }
  const bucket = await Bucket.create({user: userId, product: productId});
  product.buckets.push(bucket);
  product.bucketsCount += 1;
  await product.save();
  return bucket;
}

const removeBucketProduct = async (userId, productId) => {
  let bucket = await Bucket.findOne({user: userId, product: productId});
  if(!bucket) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User did not bucketed this Product')
  }
  let product = await getProductById(bucket.product);
  product.buckets.pull(bucket._id);
  product.bucketsCount -= 1
  await product.save();
  await bucket.remove();
  return bucket;
}

const didUserBucket = async (productId, userId) => {
  return Bucket.findOne({user: userId, product: productId});
}

const queryBuckets = async (filter, options) => {
  options.populate = 'product'
  return Bucket.paginate(filter, options);
}

module.exports = {
  bucketProduct,
  removeBucketProduct,
  queryBuckets,
  didUserBucket,
}
