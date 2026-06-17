import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Lead from './models/Lead.js';
import nodemailer from 'nodemailer';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
// @desc    Submit a new lead
// @route   POST /api/leads
app.post('/api/leads', async (req, res) => {
  try {
    const { firstName, lastName, email, company, budget, challenge } = req.body;

    if (!firstName || !lastName || !email || !company || !budget) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      company,
      budget,
      challenge: challenge || ''
    });

    // Send Email Notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'paradooxagencyoffl@gmail.com',
          subject: `New Lead: ${firstName} ${lastName} from ${company}`,
          text: `You have a new lead!\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company}\nBudget: ${budget}\nChallenge/Goal: ${challenge || 'N/A'}`
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.warn('EMAIL_USER and EMAIL_PASS not set in .env, skipping email notification.');
      }
    } catch (mailError) {
      console.error('Error sending email notification:', mailError);
      // Lead is still saved even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: lead
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// @desc    Get all leads (Admin)
// @route   GET /api/leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Server error fetching leads' });
  }
});

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.deleteOne();
    res.status(200).json({ success: true, message: 'Lead removed successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Server error deleting lead' });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Paradox API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in production-ready mode on port ${PORT}`);
  });
}

export default app;
