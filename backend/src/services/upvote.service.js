const { User, Category, Product, Upvote, Comment, Bucket } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const {getUserById} = require('./user.service');
const { getCategoryById } = require('./category.service');
const { getProductById } = require('./product.service');


const upvoteProduct = async (userId, productId) => {
  if(await Upvote.didUserAlreadyUpvote(userId, productId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already upvoted this Product')
  }
  let product = await getProductById(productId);
  if(!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Not Found');
  }
  const upvote = await Upvote.create({user: userId, product: productId});
  product.upvotes.push(upvote);
  product.upvotesCount += 1;
  await product.save();
  return upvote;
}

const removeUpvoteProduct = async (userId, productId) => {
  let upvote = await Upvote.findOne({user: userId, product: productId});
  if(!upvote) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User did not upvoted this Product')
  }
  let product = await getProductById(upvote.product);
  product.upvotes.pull(upvote._id);
  product.upvotesCount -= 1
  await product.save();
  await upvote.remove();
  return upvote;
}

const didUserUpvote = async (productId, userId) => {
  return Upvote.findOne({user: userId, product: productId});
}

const getUserUpvotes = async (user) => {
  return Upvote.find({user});
}

module.exports = {
  upvoteProduct,
  removeUpvoteProduct,
  getUserUpvotes,
  didUserUpvote,
}
