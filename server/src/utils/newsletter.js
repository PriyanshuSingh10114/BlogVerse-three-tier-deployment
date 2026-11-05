import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required",
    });
  }

  // Attempt to send email if configured, without crashing if credentials are not provided
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"BlogVerse" <${process.env.EMAIL_USER}>`,
        to: email.trim(),
        replyTo: process.env.EMAIL_USER,
        subject: "Welcome to BlogVerse 📚",
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
            <h2 style="color:#1e293b;">Welcome to BlogVerse 📚</h2>
            <p>Hi there,</p>
            <p>
              Thanks for subscribing to <strong>BlogVerse</strong>!
              You’re now part of a growing community that values insightful stories,
              thoughtful perspectives, and the latest trends.
            </p>
            <p><strong>What you can expect:</strong></p>
            <ul>
              <li>Curated articles from our editors</li>
              <li>Weekly highlights & trending topics</li>
              <li>Thought-provoking reads</li>
            </ul>
            <p style="margin-top:20px;">
              Stay curious,<br/>
              <strong>— The BlogVerse Team</strong>
            </p>
            <hr/>
            <p style="font-size:12px; color:#6b7280;">
              You received this email because you subscribed on BlogVerse.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Newsletter email dispatch error:", error.message);
      // Return error only if email dispatch was explicitly expected and failed
      return res.status(500).json({
        success: false,
        message: "Unable to complete subscription at the moment. Please try again later.",
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Subscription successful. Welcome to BlogVerse!",
  });
});

export default router;
