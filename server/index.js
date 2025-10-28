const express = require('express');
const fetch = require('node-fetch'); // Use node-fetch v2 for CommonJS
const cors = require('cors');
require('dotenv').config();

const app = express();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Fallback for local dev

app.use(cors({
  origin: `${API_URL}`, // Allow requests from React app
  methods: ["GET", "POST", "OPTIONS", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Kite-Version"],
  credentials: true,
}));
app.use(express.json());


app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, organization, phone, subject, message, category } = req.body;
    const FROM_EMAIL = 'info@flyhivetechnologies.com'; // Replace with your verified domain, e.g., noreply@hiveindustries.com
    const TO_EMAIL = 'info@flyhivetechnologies.com';
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // Validate required fields
    if (!name || !email || !subject || !message || !category) {
      return res.status(400).json({ error: 'Missing required fields: name, email, subject, message, and category are required' });
    }

    // Send email to info@flyhivetechnologies.com
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Inquiry Type:</strong> ${category}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send email to Hive Industries: ${errorData.message || response.statusText}`);
    }

    // Send confirmation email to user
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Thank You for Your Submission',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
            <h2 style="color: #333;">Thank You for Contacting Hive+ Industries</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you soon. Below is a copy of your submission for your records:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${subject}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Inquiry Type:</td><td style="padding: 8px;">${category}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${message}</td></tr>
            </table>
            <p style="color: #555;">Best regards,<br>Hive+ Industries Team</p>
            <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        `,
      }),
    });

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.json();
      throw new Error(`Failed to send confirmation email: ${errorData.message || confirmationResponse.statusText}`);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({ error: err.message || 'Failed to send emails' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));