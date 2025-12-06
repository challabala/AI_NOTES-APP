const express = require('express');
const router = express.Router();
const { startQuiz, submitAnswer } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startQuiz);
router.post('/:id/answer', protect, submitAnswer);

module.exports = router;
