const Flashcard = require('../models/Flashcard');
const Note = require('../models/Note');

const updateFlashcard = async (req, res) => {
    try {
        const card = await Flashcard.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Flashcard not found' });

        // Verify ownership via Note
        const note = await Note.findOne({ _id: card.noteId, userId: req.user.id });
        if (!note) return res.status(401).json({ message: 'Not authorized' });

        card.question = req.body.question || card.question;
        card.answer = req.body.answer || card.answer;
        card.difficulty = req.body.difficulty || card.difficulty;
        
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFlashcard = async (req, res) => {
    try {
        const card = await Flashcard.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Flashcard not found' });

        const note = await Note.findOne({ _id: card.noteId, userId: req.user.id });
        if (!note) return res.status(401).json({ message: 'Not authorized' });

        await card.deleteOne();
        res.json({ message: 'Flashcard removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFlashcardStatus = async (req, res) => {
    const { status } = req.body; // 'learning', 'mastered'
    try {
        const card = await Flashcard.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Flashcard not found' });

        const note = await Note.findOne({ _id: card.noteId, userId: req.user.id });
        if (!note) return res.status(401).json({ message: 'Not authorized' });

        card.status = status;
        card.lastReviewedAt = new Date();
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateFlashcard,
    deleteFlashcard,
    updateFlashcardStatus
};
