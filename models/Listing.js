const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const listingSchema = new mongoose.Schema(
	{
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
		address: {
			type: String,
			required: [true, 'Please add an address'],
		},
		location: {
			type: {
				type: String, // Don't do `{ location: { type: String } }`
				enum: ['Point'], // 'location.type' must be 'Point'
			},
			coordinates: {
				type: [Number],
				indexe: '2dsphere',
			},

			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},

		price: {
			type: Number,
			required: [true, 'Price is a required field'],
			min: [1, 'Price cannot be zero'],
		},

		// bedrooms: {
		// 	type: Number,
		// 	required: [true, 'bedrooms is a required field'],
		// 	enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		// },

		// bathrooms: {
		// 	type: Number,
		// 	required: [true, 'Bathroom is a required field'],
		// 	enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		// },

		// squareFeet: {
		// 	type: Number,
		// 	required: [true, 'Square feet is a required field'],
		// },
		// water: {
		// 	type: Boolean,
		// 	enum: ['Yes', 'No'],
		// },
		// selfMeter: {
		// 	type: Boolean,
		// 	enum: ['Yes', 'No'],
		// },
		// polythank: {
		// 	type: Boolean,
		// 	enum: ['Yes', 'No'],
		// },
		// totalNumberOfTenants: {
		// 	type: Number,
		// },
		// Landlord: {
		// 	type: String,
		// 	enum: ['Yes', 'No'],
		// },

		// phoneNumber: {
		// 	type: Number,
		// 	required: [true, 'Phone is a required field'],
		// },
		// furnishing: {
		// 	type: String,
		// 	required: [true, 'Furnishing is required'],
		// 	enum: {
		// 		values: ['Furnished', 'Semi-Furnished'],
		// 		message: 'Furninshig  is either: Furnished ,Semi-Furnished',
		// 	},
		// },

		coverImage: {
			type: String,
			required: [true, 'Cover Image is a required field'],
			default: 'no-default.jpg',
		},
		Images: [Array],

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			//required: true,
		},

		realtor: {
			type: mongoose.Schema.ObjectId,
			ref: 'Realtors',
			//required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

listingSchema.pre('save', async function (next) {
	const loc = await geocoder.geocode(this.address);
	this.location = {
		type: 'Point',
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};

	// Do not save address in DB
	this.address = undefined;
	next();
});

//delete the relationship
listingSchema.pre('remove', async function (next) {
	console.log(`Reviews removed from the listings`);
	await this.model('Reviews').deleteMany({ listing: this._id });
	next();
});

//Reverse populate
listingSchema.virtual('reviews', {
	ref: 'Reviews',
	localField: '_id',
	foreignField: 'listing', //from the ref
	justOne: false,
});

module.exports = mongoose.model('Listings', listingSchema);
