const nodemailer = require('nodemailer');

const sendEnquiryEmail = async (enquiryData) => {
  const user = process.env.EMAIL_USER || 'praveencse1503@gmail.com';
  const pass = process.env.EMAIL_APP_PASSWORD;

  if (!pass) {
    console.log('[Nodemailer] EMAIL_APP_PASSWORD not set in .env. Skipping actual SMTP email dispatch.');
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });

    const mailOptions = {
      from: `pravxnstudio Enquiries <${user}>`,
      to: 'praveencse1503@gmail.com',
      subject: `✨ New Wedding Enquiry: ${enquiryData.name} - ${enquiryData.eventType || 'Wedding'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1c1c1c; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #a38b70; margin-bottom: 20px;">pravxnstudio — New Client Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Client Name:</td><td style="padding: 8px;">${enquiryData.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${enquiryData.email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${enquiryData.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Event Type:</td><td style="padding: 8px;">${enquiryData.eventType || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Event Date:</td><td style="padding: 8px;">${enquiryData.weddingDate ? new Date(enquiryData.weddingDate).toLocaleDateString() : 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Venue / Location:</td><td style="padding: 8px;">${enquiryData.venue || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Guest Count:</td><td style="padding: 8px;">${enquiryData.guestCount || 'N/A'}</td></tr>
          </table>
          <h3 style="color: #555; margin-top: 20px;">Story / Message:</h3>
          <p style="background: #f9f9f9; padding: 12px; border-radius: 4px; font-style: italic;">${enquiryData.message || 'No additional message provided.'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Sent from pravxnstudio Website</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer] Email sent successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Nodemailer Error] ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEnquiryEmail };
