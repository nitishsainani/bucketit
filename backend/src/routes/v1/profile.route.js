const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const profileValidation = require('../../validations/profile.validation');
const profileController = require('../../controllers/profile.controller');

const router = express.Router();

router
  .route('/')
  .patch(auth(), validate(profileValidation.updateProfile), profileController.updateProfile)
  .get(auth(), profileController.getProfile)

module.exports = router;
