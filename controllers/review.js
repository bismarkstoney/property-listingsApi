const Review = require('../models/Review');
const APIFeatures = require('../utils/apiFeaures');
//@dsc- create a listing
//route - POST /api/v1/listing
//Access - Private
exports.createReviews = async (req, res) => {
	try {
		const reviews = await Review.create(req.body);
		res.status(200).json({
			status: 'Sucess',
			results: reviews.length,
			data: {
				reviews,
			},
		});
	} catch (error) {
		console.log(error.message);
	}
};

//@dsc- get all listings
//route - Get /api/v1/listing
//Access - Public
exports.getReviews = async (req, res) => {
	try {
		const features = new APIFeatures(Review.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const review = await features.query;
		res.status(200).json({
			status: 'Sucess',
			results: review.length,
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'Fialed',
			message: error.message,
		});
	}
};
//@dsc- get all listings
//route - GET /api/v1/listing/:id
//Access - Public
exports.getReviews = async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		res.status(200).json({
			status: 'Successs',
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: ' Failed',
			message: error.message,
		});
	}
};
//@dsc-  Delete a review
//route - DELETE /api/v1/listing/:id
//Access - Private
exports.deleteListing = async (req, res) => {
	try {
		const listing = await Listing.findByIdAndDelete(req.params.id);
		res.status(200).json({
			status: 'Successs',
			message: 'Delete',
		});
	} catch (error) {
		res.status(400).json({
			status: ' Failed',
			message: error.message,
		});
	}
};
//@dsc- Update a listing
//route - PUT /api/v1/listing/:id
//Access - Private
exports.updateReview = async (req, res) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'Successs',
			message: 'updated',
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: ' Failed',
			message: error.message,
		});
	}
};
