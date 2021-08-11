const { User, Category, Product, Upvote, Comment, Bucket } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const { getUserById } = require('./user.service');
const { getProductById } = require('./product.service');


const getCommentById = async (commentId) => {
  return Comment.findById(commentId);
}

const queryComments = async (filter, options) => {
  options.populate = 'user';
  return await Comment.paginate(filter, options, null, 'user');
}

const addCommentProduct = async (commentBody) => {
  const comment = await Comment.create(commentBody);
  let product = await getProductById(comment.product);
  await product.comments.push(await Comment.create(commentBody));
  product.commentsCount += 1
  await product.save();
  return comment;
}

const updateComment = async (comment, updateBody) => {
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
}

const removeCommentProduct = async (comment) => {
  let product = await getProductById(comment.product);
  await product.comments.pull(comment._id);
  product.commentsCount -= 1;
  await product.save();
  await comment.remove();
  return comment;
}

const getUserComments = async (user) => {
  return Comment.find({user});
}

const upvoteComment = async (commentId, userId) => {
  // TO be done later
}

const removeUpvoteComment = async (commentId, userId) => {
  // TO be done later
}

module.exports = {
  getCommentById,
  queryComments,
  addCommentProduct,
  updateComment,
  removeCommentProduct,
}
