const express = require('express');
const router = express.Router();
const { 
    getNotes, getNoteById, createNote, updateNote, deleteNote,
    generateNoteSummary, getNoteSummary, generateNoteFlashcards
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNotes)
    .post(protect, createNote);

router.route('/:id')
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

router.post('/:id/generate-summary', protect, generateNoteSummary);
router.get('/:id/summary', protect, getNoteSummary);

router.post('/:id/generate-flashcards', protect, generateNoteFlashcards);
// Flashcards retrieval specific to note could be here or separate. 
// User asked for GET /api/notes/:id/flashcards
const Flashcard = require('../models/Flashcard');
router.get('/:id/flashcards', protect, async (req, res) => {
    const flashcards = await Flashcard.find({ noteId: req.params.id });
    res.json(flashcards);
});

module.exports = router;
