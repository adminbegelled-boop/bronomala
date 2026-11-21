const Participant = require('../models/Participant');

// Helper to generate unique ticket ID (e.g., FW-849201)
const generateTicketId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `BMS-${randomNum}`;
};

// Public: Register a new participant (Name, Phone, Batch, T-Shirt Size)
const registerParticipant = async (req, res) => {
  try {
    const {
      name,
      phone,
      batch,
      tshirtSize,
      email,
      department,
      studentId,
      farewellMessage,
    } = req.body;

    if (!name || !phone || !batch || !tshirtSize) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, batch, and t-shirt size are required.',
      });
    }

    // Check if phone number is already registered
    const existingPhone = await Participant.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: `This phone number is already registered with Ticket #${existingPhone.ticketId}.`,
        ticketId: existingPhone.ticketId,
      });
    }

    // Generate unique ticket ID
    let ticketId = generateTicketId();
    let collision = await Participant.findOne({ ticketId });
    while (collision) {
      ticketId = generateTicketId();
      collision = await Participant.findOne({ ticketId });
    }

    const newParticipant = new Participant({
      ticketId,
      name: name.trim(),
      phone: phone.trim(),
      batch: batch.trim(),
      tshirtSize,
      email: email ? email.toLowerCase().trim() : '',
      department: department ? department.trim() : 'General',
      studentId: studentId ? studentId.trim() : '',
      farewellMessage: farewellMessage ? farewellMessage.trim() : '',
      paymentStatus: 'Pending',
    });

    await newParticipant.save();

    return res.status(201).json({
      success: true,
      message: 'Congratulations! Farewell registration completed successfully.',
      participant: newParticipant,
    });
  } catch (error) {
    console.error('[ParticipantController.register] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process registration. Please try again.',
      error: error.message,
    });
  }
};

// Public: Find participant by ticket ID or phone
const getByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const query = ticketId.trim();

    const participant = await Participant.findOne({
      $or: [
        { ticketId: query.toUpperCase() },
        { phone: query },
        { email: query.toLowerCase() },
      ],
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'No participant registration found for this Ticket ID or Phone Number.',
      });
    }

    return res.status(200).json({
      success: true,
      participant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error searching for ticket',
      error: error.message,
    });
  }
};

// Admin: Get all participants with search, filter, and pagination
const getAllParticipants = async (req, res) => {
  try {
    const {
      search = '',
      batch = '',
      tshirtSize = '',
      paymentStatus = '',
      attendanceStatus = '',
      page = 1,
      limit = 100,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { phone: searchRegex },
        { ticketId: searchRegex },
        { email: searchRegex },
        { studentId: searchRegex },
      ];
    }

    if (batch) query.batch = batch;
    if (tshirtSize) query.tshirtSize = tshirtSize;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (attendanceStatus) query.attendanceStatus = attendanceStatus;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(500, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [participants, total] = await Promise.all([
      Participant.find(query).sort(sort).skip(skip).limit(limitNum),
      Participant.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      participants,
    });
  } catch (error) {
    console.error('[ParticipantController.getAll] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve participants',
      error: error.message,
    });
  }
};

// Admin: Get single participant
const getParticipantById = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }
    return res.status(200).json({
      success: true,
      participant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching participant',
      error: error.message,
    });
  }
};

// Admin: Manually create a participant
const createParticipant = async (req, res) => {
  try {
    const data = req.body;
    let ticketId = data.ticketId || generateTicketId();

    const newParticipant = new Participant({
      ...data,
      ticketId,
      name: data.name?.trim(),
      phone: data.phone?.trim(),
      batch: data.batch?.trim(),
    });

    await newParticipant.save();

    return res.status(201).json({
      success: true,
      message: 'Participant created successfully',
      participant: newParticipant,
    });
  } catch (error) {
    console.error('[ParticipantController.create] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create participant',
      error: error.message,
    });
  }
};

// Admin: Update a participant
const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const updated = await Participant.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Participant updated successfully',
      participant: updated,
    });
  } catch (error) {
    console.error('[ParticipantController.update] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update participant',
      error: error.message,
    });
  }
};

// Admin: Delete a participant
const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Participant.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Participant "${deleted.name}" (${deleted.ticketId}) removed successfully.`,
    });
  } catch (error) {
    console.error('[ParticipantController.delete] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete participant',
      error: error.message,
    });
  }
};

// Admin: Fast Check-in toggle
const toggleCheckIn = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findById(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }

    const isCurrentlyCheckedIn = participant.attendanceStatus === 'Checked-in';
    participant.attendanceStatus = isCurrentlyCheckedIn ? 'Not Checked-in' : 'Checked-in';
    participant.checkedInAt = isCurrentlyCheckedIn ? null : new Date();

    await participant.save();

    return res.status(200).json({
      success: true,
      message: `${participant.name} is now marked as ${participant.attendanceStatus}`,
      participant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to toggle check-in status',
      error: error.message,
    });
  }
};

// Admin: Toggle or complete payment status
const togglePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findById(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }

    const isCompleted = participant.paymentStatus === 'Completed';
    participant.paymentStatus = isCompleted ? 'Pending' : 'Completed';

    await participant.save();

    return res.status(200).json({
      success: true,
      message: `${participant.name}'s payment status is now ${participant.paymentStatus}`,
      participant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
      error: error.message,
    });
  }
};

// Admin: Get Dashboard Stats
const getStats = async (req, res) => {
  try {
    const [
      total,
      checkedIn,
      paid,
      pendingPayment,
      tshirtAgg,
      batchAgg,
    ] = await Promise.all([
      Participant.countDocuments(),
      Participant.countDocuments({ attendanceStatus: 'Checked-in' }),
      Participant.countDocuments({ paymentStatus: 'Completed' }),
      Participant.countDocuments({ paymentStatus: 'Pending' }),
      Participant.aggregate([
        { $match: { paymentStatus: 'Completed' } },
        { $group: { _id: '$tshirtSize', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Participant.aggregate([
        { $group: { _id: '$batch', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    // Format tshirt sizes
    const tshirtSizes = {};
    ['S', 'M', 'L', 'XL', 'XXL', '3XL'].forEach((s) => (tshirtSizes[s] = 0));
    tshirtAgg.forEach((item) => {
      if (item._id) tshirtSizes[item._id] = item.count;
    });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        checkedIn,
        attendanceRate: total > 0 ? Math.round((checkedIn / total) * 100) : 0,
        paid,
        pendingPayment,
        tshirtSizes,
        batches: batchAgg.map((b) => ({ batch: b._id || 'Unknown', count: b.count })),
      },
    });
  } catch (error) {
    console.error('[ParticipantController.getStats] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message,
    });
  }
};

// Admin: Export all participants as CSV
const exportCSV = async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });

    const headers = [
      'Ticket ID',
      'Student Name',
      'Phone Number',
      'Batch',
      'T-Shirt Size',
      'Attendance Status',
      'Registration Date',
    ];

    const escapeCSV = (str) => {
      if (str === null || str === undefined) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = participants.map((p) => [
      escapeCSV(p.ticketId),
      escapeCSV(p.name),
      escapeCSV(p.phone),
      escapeCSV(p.batch),
      escapeCSV(p.tshirtSize),
      escapeCSV(p.attendanceStatus),
      escapeCSV(new Date(p.createdAt).toLocaleDateString()),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=bornomala-farewell-participants.csv');
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('[ParticipantController.exportCSV] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate CSV export',
      error: error.message,
    });
  }
};

module.exports = {
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
};
