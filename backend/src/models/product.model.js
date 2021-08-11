const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { ObjectId } = mongoose.SchemaTypes

const productSchema = new mongoose.Schema({
  categories: [
    {
      type: ObjectId,
      ref: 'Category',
      required: true,
    }
  ],
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 200,
  },
  logo: {
    type: String,
    required: true,
  },
  website: String,
  appLink: String,
  submittedBy: {
    type: ObjectId,
    ref: 'User',
  },
  upvotes: [
    {
      type: ObjectId,
      ref: 'Upvote'
    }
  ],
  upvotesCount: {
    type: Number,
    min: 0,
    default: 0,
  },

  comments: [
    {
      type: ObjectId,
      ref: 'Comment'
    }
  ],
  commentsCount: {
    type: Number,
    min: 0,
    default: 0,
  },

  buckets: [
    {
      type: ObjectId,
      ref: 'Bucket'
    }
  ],
  bucketsCount: {
    type: Number,
    min: 0,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
    private: true,
  }

}, {timestamps: true});

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.statics.isTitleTaken = async function (title, excludeProductId) {
  const product = await this.findOne({title, _id: { $ne: excludeProductId } });
  return !!product;
}


/**
 * @typedef Product
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
