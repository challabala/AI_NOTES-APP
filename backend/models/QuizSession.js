const mongoose = require('mongoose');

const quizSessionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' }, // Optional, if quiz is specific to a note
    subject: { type: String }, // Optional, if quiz is subject-based
    totalQuestions: { type: Number, default: 0 },
    correctCount: { type: Number, default: 0 },
    incorrectCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('QuizSession', quizSessionSchema);
