const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');


const updateProfile = catchAsync(async (req, res) => {
  console.log(req.user);
  const user = await userService.updateUserById(req.user._id, req.body);
  res.send(user);
})

const getProfile = catchAsync(async (req, res) => {
  res.send(req.user);
});

module.exports = {
  updateProfile,
  getProfile,
}
