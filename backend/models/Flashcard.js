const mongoose = require('mongoose');

const flashcardSchema = mongoose.Schema({
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    status: { type: String, enum: ['new', 'learning', 'mastered'], default: 'new' },
    lastReviewedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema);
