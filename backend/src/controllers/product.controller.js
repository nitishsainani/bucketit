const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, productService, commentService, bucketService } = require('../services');


const createProduct = catchAsync(async (req, res) => {
  req.body.submittedBy = req.user._id;
  let product = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send(product);
})

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if(!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
})

const getProducts = catchAsync(async (req, res) => {
  let { categories, verified } = req.query;
  if(categories) {
    categories = categories.split(',').map(c => c.trim());
    let categoriesSet = new Set(categories);
    categories = [...categoriesSet]
  }
  if (verified && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'No Permission')
  }
  const filter = pick(req.query, ['verified']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(req.query.search, categories, filter, options);
  res.send(result);
})

const updateProduct = catchAsync(async (req, res) => {
  const user = req.user;
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (user.role !== 'admin' && product.submittedBy !== req.user){
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner of product can edit')
  }
  const updatedProduct = await productService.updateProduct(product, req.body);
  res.send(updatedProduct);
})

const deleteProduct = catchAsync(async (req, res) => {
  const user = req.user;
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (user.role !== 'admin' && product.submittedBy !== req.user){
    throw new ApiError(httpStatus.FORBIDDEN, 'Only owner of product can edit')
  }
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}
