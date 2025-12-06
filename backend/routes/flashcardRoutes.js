const express = require('express');
const router = express.Router();
const { updateFlashcard, deleteFlashcard, updateFlashcardStatus } = require('../controllers/flashcardController');
const { protect } = require('../middleware/authMiddleware');

router.put('/:id', protect, updateFlashcard);
router.delete('/:id', protect, deleteFlashcard);
router.patch('/:id/status', protect, updateFlashcardStatus);

module.exports = router;
