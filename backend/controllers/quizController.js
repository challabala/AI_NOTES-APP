const QuizSession = require('../models/QuizSession');

const startQuiz = async (req, res) => {
    const { noteId, subject } = req.body;
    try {
        const session = await QuizSession.create({
            userId: req.user.id,
            noteId,
            subject,
            totalQuestions: 0
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const submitAnswer = async (req, res) => {
    // This is optional logic to track stats per session
    // Client sends { correct: boolean }
    const { correct } = req.body;
    try {
        const session = await QuizSession.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        
        session.totalQuestions += 1;
        if (correct) session.correctCount += 1;
        else session.incorrectCount += 1;

        await session.save();
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { startQuiz, submitAnswer };
