const { prisma } = require('../config/db');

// ─── USER-FACING CONTROLLERS ───────────────────────────────────────────────────

/**
 * @desc    Create a new ticket (citizen reports an issue)
 * @route   POST /api/tickets
 * @access  Private (user)
 */
const createTicket = async (req, res, next) => {
    try {
        const { title, description, category, location } = req.body;

        // Build media array from uploaded files (Multer + Cloudinary)
        const mediaData =
            req.files && req.files.length > 0
                ? req.files.map((file) => ({
                    url: file.path, // Cloudinary URL
                    resourceType: file.mimetype.startsWith('video') ? 'video' : 'image',
                }))
                : [];

        const ticket = await prisma.ticket.create({
            data: {
                title,
                description,
                category,
                location,
                createdById: req.user.id,
                media: {
                    create: mediaData
                }
            },
            include: {
                media: true
            }
        });

        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get tickets created by the logged-in user
 * @route   GET /api/tickets/my
 * @access  Private (user)
 */
const getMyTickets = async (req, res, next) => {
    try {
        const tickets = await prisma.ticket.findMany({
            where: { createdById: req.user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                createdBy: {
                    select: { name: true, email: true }
                },
                media: true
            }
        });

        res.status(200).json({ success: true, count: tickets.length, data: tickets });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get a single ticket by ID
 * @route   GET /api/tickets/:id
 * @access  Private
 */
const getTicketById = async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                createdBy: {
                    select: { name: true, email: true }
                },
                media: true,
                progressNotes: {
                    include: {
                        updatedBy: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        if (!ticket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' });
        }

        // Users can only view their own tickets; admins can view any
        if (
            req.user.role !== 'admin' &&
            ticket.createdById !== req.user.id
        ) {
            return res
                .status(403)
                .json({ success: false, message: 'Not authorized to view this ticket' });
        }

        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a ticket (user can edit title, description, category, location, media)
 * @route   PUT /api/tickets/:id
 * @access  Private (user — only if ticket is not Resolved)
 */
const updateTicket = async (req, res, next) => {
    try {
        const ticketId = parseInt(req.params.id);
        let ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' });
        }

        // Only the creator can edit
        if (ticket.createdById !== req.user.id) {
            return res
                .status(403)
                .json({ success: false, message: 'Not authorized to edit this ticket' });
        }

        // Cannot edit resolved tickets
        if (ticket.status === 'Resolved') {
            return res
                .status(400)
                .json({ success: false, message: 'Cannot edit a resolved ticket' });
        }

        const { title, description, category, location } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (location) updateData.location = location;

        // Handle new file uploads
        if (req.files && req.files.length > 0) {
            const newMedia = req.files.map((file) => ({
                url: file.path,
                resourceType: file.mimetype.startsWith('video') ? 'video' : 'image',
            }));
            updateData.media = {
                create: newMedia
            };
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: ticketId },
            data: updateData,
            include: {
                media: true
            }
        });

        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a ticket (user can delete their own)
 * @route   DELETE /api/tickets/:id
 * @access  Private (user — own ticket only)
 */
const deleteTicket = async (req, res, next) => {
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' });
        }

        if (ticket.createdById !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this ticket',
            });
        }

        // Delete related media and progress notes first (or rely on Cascade if set up, but let's be explicit)
        await prisma.media.deleteMany({ where: { ticketId } });
        await prisma.progressNote.deleteMany({ where: { ticketId } });
        await prisma.ticket.delete({ where: { id: ticketId } });

        res.status(200).json({ success: true, message: 'Ticket deleted' });
    } catch (error) {
        next(error);
    }
};

// ─── ADMIN CONTROLLERS ─────────────────────────────────────────────────────────

/**
 * @desc    Get all tickets (with optional filters)
 * @route   GET /api/tickets/admin/all
 * @access  Private (admin)
 */
const getAllTickets = async (req, res, next) => {
    try {
        const { category, status, page = 1, limit = 20 } = req.query;

        const where = {};
        if (category) where.category = category;
        if (status) {
            // Map Mongoose status with space to Prisma enum if needed
            where.status = status === 'In Progress' ? 'InProgress' : status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [tickets, total] = await Promise.all([
            prisma.ticket.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
                include: {
                    createdBy: {
                        select: { name: true, email: true }
                    },
                    media: true
                }
            }),
            prisma.ticket.count({ where })
        ]);

        res.status(200).json({
            success: true,
            count: tickets.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / take),
            data: tickets,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update ticket status (admin only)
 * @route   PUT /api/tickets/admin/:id/status
 * @access  Private (admin)
 */
const updateTicketStatus = async (req, res, next) => {
    try {
        let { status } = req.body;

        const validStatuses = ['Submitted', 'In Progress', 'Resolved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res
                .status(400)
                .json({ success: false, message: 'Invalid status value' });
        }

        // Map status
        const prismaStatus = status === 'In Progress' ? 'InProgress' : status;

        const ticket = await prisma.ticket.update({
            where: { id: parseInt(req.params.id) },
            data: { status: prismaStatus },
            include: {
                createdBy: {
                    select: { name: true, email: true }
                }
            }
        });

        res.status(200).json({ success: true, data: ticket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add a progress note to a ticket (admin only)
 * @route   POST /api/tickets/admin/:id/notes
 * @access  Private (admin)
 */
const addProgressNote = async (req, res, next) => {
    try {
        const { note } = req.body;
        const ticketId = parseInt(req.params.id);

        if (!note) {
            return res
                .status(400)
                .json({ success: false, message: 'Note text is required' });
        }

        const ticketExists = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticketExists) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: ticketId },
            data: {
                progressNotes: {
                    create: {
                        note,
                        updatedById: req.user.id,
                        date: new Date()
                    }
                }
            },
            include: {
                progressNotes: {
                    include: {
                        updatedBy: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        res.status(200).json({ success: true, data: updatedTicket });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Admin delete any ticket
 * @route   DELETE /api/tickets/admin/:id
 * @access  Private (admin)
 */
const adminDeleteTicket = async (req, res, next) => {
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' });
        }

        await prisma.media.deleteMany({ where: { ticketId } });
        await prisma.progressNote.deleteMany({ where: { ticketId } });
        await prisma.ticket.delete({ where: { id: ticketId } });

        res.status(200).json({ success: true, message: 'Ticket deleted by admin' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get dashboard analytics
 * @route   GET /api/tickets/admin/analytics
 * @access  Private (admin)
 */
const getAnalytics = async (req, res, next) => {
    try {
        const [statusStats, categoryStats, totalCount] = await Promise.all([
            prisma.ticket.groupBy({
                by: ['status'],
                _count: { _all: true }
            }),
            prisma.ticket.groupBy({
                by: ['category'],
                _count: { _all: true }
            }),
            prisma.ticket.count(),
        ]);

        const byStatus = {};
        statusStats.forEach((s) => (byStatus[s.status] = s._count._all));

        const byCategory = {};
        categoryStats.forEach((c) => (byCategory[c.category] = c._count._all));

        res.status(200).json({
            success: true,
            data: {
                total: totalCount,
                submitted: byStatus['Submitted'] || 0,
                inProgress: byStatus['InProgress'] || 0,
                resolved: byStatus['Resolved'] || 0,
                rejected: byStatus['Rejected'] || 0,
                byCategory,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
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
};
