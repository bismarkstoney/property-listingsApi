const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'title  is a required field'],
		trim: true,
		maxlength: [200, 'Title cannot be more than 200 characters'],
		minlength: [5, 'Title cannot be less 5 characters'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		maxlength: [500, 'Title cannot be more than 200 characters'],
		minlength: [5, 'Title cannot be less 5 characters'],
	},
	rating: { type: Number },
	listing: {
		type: mongoose.Schema.ObjectId,
		ref: 'Listings',
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
