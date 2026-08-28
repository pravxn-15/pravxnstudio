const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

router.post('/', createEnquiry);
router.get('/', protect, getEnquiries);
router.put('/:id/status', protect, updateEnquiryStatus);

module.exports = router;
