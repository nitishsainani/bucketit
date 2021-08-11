const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { ObjectId } = mongoose.SchemaTypes;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  product: {
    type: ObjectId,
    ref: 'Product'
  }
}, {timestamps: true})

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
