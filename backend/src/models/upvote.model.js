const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { ObjectId } = mongoose.SchemaTypes;

const upvoteSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true
  }
})

upvoteSchema.index({user: 1, product: 1}, {unique: true});
upvoteSchema.plugin(toJSON);
upvoteSchema.plugin(paginate);

upvoteSchema.statics.didUserAlreadyUpvote = async function (user, product) {
  const upvote = await this.findOne({user, product});
  return !!upvote;
}

const Upvote = mongoose.model("Upvote", upvoteSchema);

module.exports = Upvote;
