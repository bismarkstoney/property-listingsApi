const asyncHandler = require('../middleware/asynhandle');
const Listing = require('../models/Listing');
const APIFeatures = require('../utils/apiFeaures');
const ErrorResponse = require('../utils/errorHandle');
//@dsc- create a listing
//route - POST /api/v1/listing
//Access - Private
exports.createListing = async (req, res) => {
	try {
		const listing = await Listing.create(req.body);
		res.status(200).json({
			status: 'Sucess',
			results: listing.length,
			data: {
				listing,
			},
		});
	} catch (error) {
		console.log(error.message);
	}
};

//@dsc- get all listings
//route - Get /api/v1/listing
//Access - Public
exports.getListings = async (req, res) => {
	try {
		const features = new APIFeatures(
			Listing.find().populate({ path: 'reviews', select: 'title description' }),
			req.query
		)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const listing = await features.query;
		res.status(200).json({
			status: 'Sucess',
			results: listing.length,
			data: {
				listing,
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
exports.getListing = async (req, res) => {
	try {
		const listing = await Listing.findById(req.params.id);
		res.status(200).json({
			status: 'Successs',
			data: {
				listing,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: ' Failed',
			message: error.message,
		});
	}
};
//@dsc-  Delete a listing
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
exports.updateListing = async (req, res) => {
	try {
		const listing = await Listing.findById(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		Listing.remove();
		res.status(200).json({
			status: 'Successs',
			message: 'updated',
			data: {
				listing,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: ' Failed',
			message: error.message,
		});
	}
};

exports.photoUploadListing = asyncHandler(async (req, res, next) => {
	const listing = await Listing.findById(req.params.id);
	if (!listing) {
		return next(
			new ErrorResponse(`listing not found for ${req.params.id}`, 404)
		);
	}
	if (!req.files) {
		return next(new ErrorResponse('Please upload a file', 404));
	}
	const file = req.files.file;
	//make sure the image is a files
	if (file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image `, 400));
	}
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
				404
			)
		);
	}
	//CREATE custome file name
	file.name = `photo_${bootcamp._id}`;
	console.log(file.name);
});
