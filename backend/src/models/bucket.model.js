const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { ObjectId } = mongoose.SchemaTypes;

const bucketSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  product: {
    type: ObjectId,
    ref: 'Product',
  }
})

bucketSchema.plugin(paginate);
bucketSchema.plugin(toJSON);
bucketSchema.index({user: 1, product: 1}, {unique: true});

bucketSchema.statics.didUserAlreadyBucket = async function (user, product) {
  const bucket = await this.findOne({user, product});
  return !!bucket;
}

const Bucket = mongoose.model("Bucket", bucketSchema);

module.exports = Bucket;
