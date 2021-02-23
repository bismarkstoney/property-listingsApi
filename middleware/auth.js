const jwt = require('jsonwebtoken');
const asynhandle = require('./asynhandle');

const User = require('../models/User');
const ErrorResponse = require('../utils/errorHandle');

exports.protect = asynhandle(async (req, res, next) => {
	let token;

	//check for the token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	// else if(req.cookies.token){
	//     token=req.cookies.token
	// }

	//make sure token exists
	if (!token) {
		return next(new ErrorResponse('Not authorize to access this route', 401));
	}
	try {
		//Verify token
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decode);
		req.user = await User.findById(decode.id);
		next();
	} catch (err) {
		return next(new ErrorResponse('Not authorize to access this route', 401));
	}
});

//Grant access to specific roles

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new ErrorResponse('Not authorize to access this route', 403));
		}
		next();
	};
};
