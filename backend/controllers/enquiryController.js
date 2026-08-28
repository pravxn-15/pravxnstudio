const Enquiry = require('../models/Enquiry');
const { sendEnquiryEmail } = require('../config/mailer');

// @desc    Submit Enquiry (Public)
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, eventType, weddingDate, venue, guestCount, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone number are required.' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      eventType: eventType || 'Wedding',
      weddingDate: weddingDate ? new Date(weddingDate) : null,
      venue: venue || '',
      guestCount: guestCount ? Number(guestCount) : 0,
      message: message || '',
      status: 'new'
    });

    const savedEnquiry = await enquiry.save();

    // Trigger email notification asynchronously
    sendEnquiryEmail(savedEnquiry).catch(err => {
      console.error('[Enquiry Email Trigger Error]', err.message);
    });

    // Generate WhatsApp direct chat link as secondary fallback
    const studioPhone = process.env.WHATSAPP_NUMBER || '918056807652';
    const waText = encodeURIComponent(
      `Hello pravxnstudio! I submitted an enquiry on your website.\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🎉 *Event:* ${eventType || 'Wedding'}\n` +
      `📅 *Date:* ${weddingDate ? new Date(weddingDate).toLocaleDateString() : 'TBD'}\n` +
      `📍 *Location:* ${venue || 'TBD'}\n` +
      `💬 *Note:* ${message || 'Looking forward to preserving our story!'}`
    );
    const whatsappUrl = `https://wa.me/${studioPhone}?text=${waText}`;

    res.status(201).json({
      message: "Thank you — your story matters to us. We'll be in touch shortly.",
      enquiry: savedEnquiry,
      whatsappUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (Admin)
// @route   PUT /api/enquiries/:id/status
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
};
