const multer = require('multer');
const upload = multer({ dest: 'public/uploads/listings' });
const {
	createListing,
	deleteListing,
	updateListing,
	getListing,
	getListings,
	photoUploadListing,
} = require('../controllers/listing');
const { protect, authorize } = require('../middleware/auth');
const express = require('express');

const router = express.Router();
router
	.route('/:id/photo')
	.put(protect, authorize('admin', 'realtor', 'user'), photoUploadListing);
router
	.route('/:id')
	.put(protect, authorize('admin', 'realtor', 'user'), updateListing)
	.delete(protect, authorize('admin', 'realtor', 'user'), deleteListing)
	.get(getListing);

router
	.route('/')
	.post(protect, authorize('admin', 'realtor', 'user'), createListing)
	.get(getListings);

module.exports = router;
