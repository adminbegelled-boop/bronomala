const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    batch: {
      type: String,
      required: [true, 'Batch/Class is required'],
      trim: true,
    },
    tshirtSize: {
      type: String,
      required: [true, 'T-Shirt size is required'],
      enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
      default: 'L',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    department: {
      type: String,
      trim: true,
      default: 'General',
    },
    studentId: {
      type: String,
      trim: true,
      default: '',
    },
    bloodGroup: {
      type: String,
      default: 'Unknown',
    },
    foodPreference: {
      type: String,
      default: 'Non-Veg',
    },
    guestCount: {
      type: Number,
      default: 0,
    },
    farewellMessage: {
      type: String,
      trim: true,
      default: '',
    },
    photoUrl: {
      type: String,
      trim: true,
      default: '',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Waived'],
      default: 'Pending',
    },
    transactionId: {
      type: String,
      trim: true,
      default: '',
    },
    attendanceStatus: {
      type: String,
      enum: ['Not Checked-in', 'Checked-in'],
      default: 'Not Checked-in',
    },
    checkedInAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

participantSchema.index({ name: 'text', phone: 'text', ticketId: 'text' });

module.exports = mongoose.model('Participant', participantSchema);
