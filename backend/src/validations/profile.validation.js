const Joi = require('joi');
const { password, objectId } = require('./custom.validation');


const updateProfile = {
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string(),
      profileImage: Joi.string(),
      profession: Joi.string().max(100),
      aboutMe: Joi.string().min(10).max(300),
      email: Joi.string().email(),
      portfolioLink: Joi.string().uri().allow('')
    })
    .min(1)
}

module.exports = {
  updateProfile
}
