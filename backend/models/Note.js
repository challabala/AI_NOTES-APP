const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    subject: { type: String, default: 'General' },
    content: { type: String, required: true }, // rawContent
    tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
