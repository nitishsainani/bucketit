const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, productService, upvoteService, bucketService } = require('../services');

const createUpvote = catchAsync(async (req, res) => {
  const upvote = await upvoteService.upvoteProduct(req.user._id, req.params.productId);
  res.status(httpStatus.CREATED).send(upvote);
})

const didUserUpvote = catchAsync(async (req, res) => {
  const upvote = await upvoteService.didUserUpvote(req.params.productId, req.user._id);
  if(!upvote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Upvote not found');
  }
  res.send(upvote);
})

const deleteUpvote = catchAsync(async (req, res) => {
  await upvoteService.removeUpvoteProduct(req.user._id, req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createUpvote,
  didUserUpvote,
  deleteUpvote,
}

