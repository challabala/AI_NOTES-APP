const mongoose = require('mongoose');

const summarySchema = mongoose.Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true, unique: true },
    shortSummary: { type: String },
    bulletSummary: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Summary', summarySchema);
