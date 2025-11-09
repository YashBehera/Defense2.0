require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } = require("@getbrevo/brevo");

const app = express();
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

app.use(
  cors({
    origin: API_URL,
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Kite-Version"],
    credentials: true,
  })
);
app.use(express.json());

// Set up Brevo client for v3
const transactionalEmailsApi = new TransactionalEmailsApi();
transactionalEmailsApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// /api/send-email endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, organization, phone, subject, message, category } = req.body;

    // Validation
    if (!name || !email || !subject || !message || !category) {
      return res.status(400).json({
        error: "Missing required fields: name, email, subject, message, and category are required",
      });
    }

    const FROM_EMAIL = process.env.SMTP_USER || "info@flyhivetechnologies.com";
    const TO_INTERNAL = "info@flyhivetechnologies.com";

    // 1. Internal notification email
    const internalEmail = new SendSmtpEmail();
    internalEmail.sender = { name: "Hive+ Industries Contact", email: FROM_EMAIL };
    internalEmail.to = [{ email: TO_INTERNAL }];
    internalEmail.subject = `Contact Form Submission: ${subject}`;
    internalEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Inquiry Type:</strong> ${category}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    // 2. User confirmation email
    const confirmEmail = new SendSmtpEmail();
    confirmEmail.sender = { name: "Hive+ Industries", email: FROM_EMAIL };
    confirmEmail.to = [{ email: email }];
    confirmEmail.subject = "Thank You for Your Submission";
    confirmEmail.htmlContent = `
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
    `;

    // Send both emails in parallel
    await Promise.all([
      transactionalEmailsApi.sendTransacEmail(internalEmail),
      transactionalEmailsApi.sendTransacEmail(confirmEmail),
    ]);

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error("Brevo Error:", err.response?.body || err.message || err);
    res.status(500).json({ error: err.message || "Failed to send emails" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));