const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, productService, bucketService } = require('../services');

const createBucket = catchAsync(async (req, res) => {
  const bucket = await bucketService.bucketProduct(req.user._id, req.query.productId);
  res.status(httpStatus.CREATED).send(bucket);
})

const getUserBuckets = catchAsync(async (req, res) => {
  req.query.user = req.user._id;
  const filter = pick(req.query, ['user', ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bucketService.queryBuckets(filter, options);
  res.send(result);
})

const deleteBucket = catchAsync(async (req, res) => {
  await bucketService.removeBucketProduct(req.user._id, req.query.productId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createBucket,
  getUserBuckets,
  deleteBucket,
}
