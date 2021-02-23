const asyncHandler = require('../middleware/asynhandle');
const Listing = require('../models/Listing');
const APIFeatures = require('../utils/apiFeaures');
const ErrorResponse = require('../utils/errorHandle');
const multer = require('multer');

const upload = multer({ dest: 'public/img/listings' });
//@dsc- create a listing
//route - POST /api/v1/listing
//Access - Private
exports.createListing = asyncHandler(async (req, res, next) => {
	//add user to request req.body
	req.body.user = req.user.id;
	//check for published listing by realtoe
	const realtor = await Listing.findOne({ user: require.user.id });

	//if user is not an admin, they can only add on listing
	if (realtor && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`The user with ID ${req.user.id} has already publishe a listing`,
				400
			)
		);
	}

	const listing = await Listing.create(req.body);
	res.status(200).json({
		status: 'Sucess',
		results: listing.length,
		data: {
			listing,
		},
	});
});

//@dsc- get all listings
//route - Get /api/v1/listing
//Access - Public
exports.getListings = asyncHandler(async (req, res, next) => {
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
});
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
		return next(new ErrorResponse('Please upload a file', 400));
	}
	const file = req.files.file;
	console.log(file);
	//make sure the image is a files
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
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
