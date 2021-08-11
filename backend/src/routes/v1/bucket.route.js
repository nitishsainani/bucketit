const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { bucketValidation } = require('../../validations')
const { bucketController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(bucketValidation.getUserBuckets),bucketController.getUserBuckets)
  .post(auth(),validate(bucketValidation.createBucket), bucketController.createBucket)
  .delete(auth(), validate(bucketValidation.deleteBucket), bucketController.deleteBucket)


module.exports = router;
