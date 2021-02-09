const Review = require('../models/Review');
const APIFeatures = require('../utils/apiFeaures');
const asyncHandler = require('../middleware/asynhandle');
const ErrorResponse = require('../utils/errorHandle');

//@dsc- create a review after user is athuthenticated
//route - POST /api/v1/review
//Access - Private
exports.createReviews = asyncHandler(async (req, res) => {
	const reviews = await Review.create(req.body);
	res.status(200).json({
		success: true,
		results: reviews.length,
		message: 'Reviews created',
		data: {
			reviews,
		},
	});
});

//@dsc- get all reviews
//route - Get /api/v1/review
//Access - Public
exports.getReviews = asyncHandler(async (req, res) => {
	const features = new APIFeatures(Review.find({}), req.query)
		.filter()
		.sort()
		.limitFields()
		.paginate();
	const review = await features.query;
	res.status(200).json({
		status: 'Sucess',
		results: review.length,
		data: review,
	});
});

//@dsc- get a single review
//route - GET /api/v1/review/:id
//Access - Public
exports.getReview = asyncHandler(async (req, res) => {
	const review = await Review.findById(req.params.id);
	if (!review) {
		return next(
			new ErrorResponse(`Review not found with the id ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		status: 'Successs',
		data: {
			review,
		},
	});
});
//@dsc-  Delete a review
//route - DELETE /api/v1/review/:id
//Access - Private
exports.deleteReview = asyncHandler(async (req, res) => {
	const review = await Review.findByIdAndDelete(req.params.id);
	if (!review) {
		return next(
			new ErrorResponse(`Review not found with the id ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		status: 'Successs',
		message: 'Delete',
	});
});
//@dsc- Update a review
//route - PUT /api/v1/review/:id
//Access - Private
exports.updateReview = asyncHandler(async (req, res) => {
	const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!review) {
		return next(
			new ErrorResponse(`Review not found with the id ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		status: 'Successs',
		message: 'updated',
		data: {
			review,
		},
	});
});
