const express = require('express');
const router = express.Router();
const {
	createReviews,
	getReviews,
	updateReview,
	deleteReview,
	getReview,
} = require('../controllers/review');

router.route('/').post(createReviews).get(getReviews);
router.route('/:id').put(updateReview).delete(deleteReview).get(getReview);

module.exports = router;
