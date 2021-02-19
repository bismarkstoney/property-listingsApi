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
const express = require('express');

const router = express.Router();
router.route('/:id/photo').put(upload.single('coverImage'), photoUploadListing);
router.route('/:id').put(updateListing).delete(deleteListing).get(getListing);

router.route('/').post(createListing).get(getListings);

module.exports = router;
