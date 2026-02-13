const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    createTicket,
    getMyTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    getAllTickets,
    updateTicketStatus,
    addProgressNote,
    adminDeleteTicket,
    getAnalytics,
} = require('../controllers/ticketController');

const router = express.Router();

// ─── Protect all routes below ───────────────────────────────────────────────
router.use(protect);

// ─── USER ROUTES ────────────────────────────────────────────────────────────

/** Create a new ticket — accepts up to 5 media files */
router.post('/', upload.array('media', 5), createTicket);

/** Get tickets belonging to the logged-in user */
router.get('/my', getMyTickets);

/** Get a single ticket by ID */
router.get('/:id', getTicketById);

/** Update an existing ticket (user — not if resolved) */
router.put('/:id', upload.array('media', 5), updateTicket);

/** Delete own ticket */
router.delete('/:id', deleteTicket);

// ─── ADMIN ROUTES ───────────────────────────────────────────────────────────

/** Get all tickets with optional category/status filters */
router.get('/admin/all', authorize('admin'), getAllTickets);

/** Get dashboard analytics */
router.get('/admin/analytics', authorize('admin'), getAnalytics);

/** Update ticket status */
router.put('/admin/:id/status', authorize('admin'), updateTicketStatus);

/** Add a progress note */
router.post('/admin/:id/notes', authorize('admin'), addProgressNote);

/** Admin delete any ticket */
router.delete('/admin/:id', authorize('admin'), adminDeleteTicket);

module.exports = router;
