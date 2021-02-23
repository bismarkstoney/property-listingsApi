const asyncHandler = require('../middleware/asynhandle');
const User = require('../models/User');
const APIFeatures = require('../utils/apiFeaures');
const ErrorResponse = require('../utils/errorHandle');

//@dsc- Register user
//route - POST /api/v1/auth/register
//Access - Public

exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	const user = await User.create({ name, email, password, role });
	// //CREATE A TOKEN
	// const token = user.getSignedJwtToken();

	// res.status(200).json({
	// 	success: true,
	// 	message: 'Register',
	// 	token,
	// });
	sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('Please Provide an email and password', 400));
	}
	//check user
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return next(new ErrorResponse('Invalid credentails', 401));
	}
	//check if password matches
	const isMatch = await user.matchPassword(password);
	if (!isMatch) {
		return next(new ErrorResponse('Ïnvalid credentails', 401));
	}
	//CREATE A TOKEN
	// const token = user.getSignedJwtToken();

	// res.status(200).json({
	// 	success: true,
	// 	message: 'login',
	// 	token,
	// });

	sendTokenResponse(user, 200, res);
});

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	//CREATE A TOKEN
	const token = user.getSignedJwtToken();
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),

		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}
	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token,
	});
};

//@dsc- Get current logged in user
//route - POST /api/v1/auth/me
//Access - Public
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		data: {
			user,
		},
	});
});
