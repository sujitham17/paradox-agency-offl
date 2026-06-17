import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
