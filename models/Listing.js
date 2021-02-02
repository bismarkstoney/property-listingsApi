const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is a required field'],
		trim: true,
		maxlength: [200, 'Title cannot be more than 200 characters'],
		minlength: [5, 'Title cannot be less 5 characters'],
	},
	description: {
		type: String,
		required: [true, 'Description is a required field'],
	},

	propertyType: {
		type: String,
		required: [true, 'Property is required field'],
		enum: {
			values: ['Apartment', 'Gated', 'House'],
		},
	},
	location: {
		type: String,
		required: [true, 'Location is required'],
	},

	price: {
		type: Number,
		required: [true, 'Price is a required field'],
		min: [1, 'Price cannot be zero'],
	},

	bedrooms: {
		type: Number,
		required: [true, 'bedrooms is a required field'],
		min: [1, 'bedroom cannot be zero'],
	},

	bathrooms: {
		type: Number,
		required: [true, 'Bathroom is a required field'],
		min: [1, 'bedroom cannot be zero'],
	},
	washrooms: {
		type: Number,
		required: [true, 'Bathroom is a required field'],
		min: [1, 'bedroom cannot be zero'],
	},
	squareFeet: {
		type: Number,
		required: [true, 'Square feet is a required field'],
	},
	water: {
		type: Boolean,
		enum: ['Yes', 'No'],
	},
	selfMeter: {
		type: Boolean,
		enum: ['Yes', 'No'],
	},
	polythank: {
		type: Boolean,
		enum: ['Yes', 'No'],
	},
	totalNumberOfTenants: {
		type: String,
	},
	Landlord: {
		type: String,
		enum: ['Yes', 'No'],
	},
	address: {
		type: String,
		required: [true, 'Address is a required field'],
	},
	city: {
		type: String,
		required: [true, 'City is a required field'],
	},
	region: {
		type: String,
		required: [true, 'Region is a required field'],
	},
	phoneNumber: {
		type: Number,
		required: [true, 'Phone is a required field'],
	},
	furnishing: {
		type: String,
		required: [true, 'Furnishing is required'],
		enum: {
			values: ['Furnished', 'Semi-Furnished'],
			message: 'Furninshig  is either: Furnished ,Semi-Furnished',
		},
	},

	coverImage: {
		type: String,
		required: [true, 'Cover Image is a required field'],
		default: 'no-default.jpg',
	},
	Images: [Array],
});

module.exports = mongoose.model('Listings', listingSchema);
