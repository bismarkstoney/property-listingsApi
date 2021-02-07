const mongoose = require('mongoose');

const RealtorsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name  is a required field'],
		trim: true,
		maxlength: [200, 'Title cannot be more than 200 characters'],
		minlength: [5, 'Title cannot be less 5 characters'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please add a valid email',
		],
	},
	PhoneNumber: { type: Number, required: [true, 'Phone Number is required'] },
	photo: { type: String },
	description: {
		type: String,
		required: [true, 'Please add a description'],
	},
	companyName: String,
	address: {
		type: String,
		required: [true, 'Address is  required'],
	},
	is_veriefied: {
		type: Boolean,
		default: false,
	},
	dateJoin: {
		type: Date,
		default: Date.now,
	},

	address: {
		type: String,
		required: [true, 'Please add an address'],
	},
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},

		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String,
	},
});
module.exports = mongoose.model('Realtors', RealtorsSchema);
