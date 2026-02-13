const mongoose = require('mongoose');

/**
 * Progress Note sub-schema — each note records a status update or comment
 * added by an admin, along with a timestamp.
 */
const progressNoteSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

/**
 * Ticket Schema
 * - title: brief summary of the civic issue
 * - description: detailed explanation
 * - category: predefined categories for filtering
 * - location: textual location/address of the issue
 * - media: array of Cloudinary URLs (images/videos)
 * - status: lifecycle status of the ticket
 * - progressNotes: admin-added progress updates
 * - createdBy: reference to the reporting citizen
 */
const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['Road', 'Water', 'Electricity', 'Garbage', 'Other'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        media: [
            {
                url: { type: String, required: true },
                resourceType: { type: String, enum: ['image', 'video'], default: 'image' },
            },
        ],
        status: {
            type: String,
            enum: ['Submitted', 'In Progress', 'Resolved', 'Rejected'],
            default: 'Submitted',
        },
        progressNotes: [progressNoteSchema],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
