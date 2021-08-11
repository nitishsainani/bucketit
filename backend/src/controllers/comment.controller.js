const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, productService, commentService, bucketService } = require('../services');


const createComment = catchAsync(async (req, res) => {
  req.body.user = req.user._id;
  req.body.product = req.params.productId;
  const comment = await commentService.addCommentProduct(req.body);
  res.status(httpStatus.CREATED).send(comment);
})

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if(!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
})

const getComments = catchAsync(async (req, res) => {
  let { productId } = req.params;
  req.query.product = productId;
  const filter = pick(req.query, ['product', ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await commentService.queryComments(filter, options);
  res.send(result);
})

const updateComment = catchAsync(async (req, res) => {
  let comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (req.user.role !== 'admin' && comment.user !== req.user){
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner of comment can edit')
  }
  const updatedComment = await commentService.updateComment(comment, req.body);
  res.send(updatedComment);
})

const deleteComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (req.user.role !== 'admin' && comment.user !== req.user){
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner of comment can remove')
  }
  await commentService.removeCommentProduct(comment);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
}

