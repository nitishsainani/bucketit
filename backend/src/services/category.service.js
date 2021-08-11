const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');


const createCategory = async (categoryBody) => {
  if (await Category.isTitleTaken(categoryBody.title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  return await Category.create(categoryBody);
};

const queryCategories = async (filter, options) => {
  return await Category.paginate(filter, options);
};

const getCategoryById = async (id) => {
  return Category.findById(id);
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.title && (await Category.isTitleTaken(updateBody.title, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }

  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
