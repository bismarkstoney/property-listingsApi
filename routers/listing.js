const {
	createListing,
	deleteListing,
	updateListing,
	getListing,
	getListings,
} = require('../controllers/listing');
const express = require('express');

const router = express.Router();

router.route('/:id').put(updateListing).delete(deleteListing).get(getListing);
router.route('/').post(createListing).get(getListings);

module.exports = router;
