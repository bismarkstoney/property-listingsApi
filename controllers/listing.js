const Listing = require('../models/Listing');
const APIFeatures = require('../utils/apiFeaures');
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
		const features = new APIFeatures(Listing.find(), req.query)
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
		const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
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
