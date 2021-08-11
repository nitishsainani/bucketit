const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { commentValidation, productValidation, upvoteValidation, bucketValidation } = require('../../validations');
const { productController, commentController, upvoteController, bucketController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct)

router
  .route('/:productId/comment')
  .post(auth(), validate(commentValidation.createComment), commentController.createComment)
  .get(auth(), validate(commentValidation.getComments), commentController.getComments)

router
  .route('/:productId/comment/:commentId')
  .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment)

router
  .route('/:productId/upvote')
  .get(auth(), validate(upvoteValidation.didUserUpvote),upvoteController.didUserUpvote)
  .post(auth(),validate(upvoteValidation.createUpvote), upvoteController.createUpvote)
  .delete(auth(), validate(upvoteValidation.deleteUpvote), upvoteController.deleteUpvote)


module.exports = router;
