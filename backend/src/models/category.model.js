const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true
  }
})

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.statics.isTitleTaken = async function (title, excludeCategoryId) {
  const category = await this.findOne({ title, _id: { $ne: excludeCategoryId } });
  return !!category;
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
