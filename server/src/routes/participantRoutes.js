const express = require('express');
const router = express.Router();
const {
  registerParticipant,
  getByTicket,
  getAllParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  toggleCheckIn,
  togglePayment,
  getStats,
  exportCSV,
} = require('../controllers/participantController');
const { verifyAdminToken } = require('../middleware/auth');

// --- Public Routes ---
router.post('/participants', registerParticipant);
router.get('/participants/ticket/:ticketId', getByTicket);

// --- Admin Protected Routes ---
router.get('/admin/participants', verifyAdminToken, getAllParticipants);
router.post('/admin/participants', verifyAdminToken, createParticipant);
router.get('/admin/participants/:id', verifyAdminToken, getParticipantById);
router.put('/admin/participants/:id', verifyAdminToken, updateParticipant);
router.delete('/admin/participants/:id', verifyAdminToken, deleteParticipant);
router.patch('/admin/participants/:id/checkin', verifyAdminToken, toggleCheckIn);
router.patch('/admin/participants/:id/payment', verifyAdminToken, togglePayment);
router.get('/admin/stats', verifyAdminToken, getStats);
router.get('/admin/export', verifyAdminToken, exportCSV);

module.exports = router;
