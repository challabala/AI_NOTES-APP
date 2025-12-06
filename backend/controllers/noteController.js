const Note = require('../models/Note');
const Summary = require('../models/Summary');
const Flashcard = require('../models/Flashcard');
const aiService = require('../services/aiService');

const getNotes = async (req, res) => {
    try {
        const { search, subject } = req.query;
        let query = { userId: req.user.id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        if (subject) {
            query.subject = { $regex: subject, $options: 'i' };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNote = async (req, res) => {
    const { title, subject, content, tags } = req.body;
    try {
        const note = await Note.create({
            userId: req.user.id,
            title,
            subject,
            content,
            tags
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    const { title, subject, content, tags } = req.body;
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        note.title = title || note.title;
        note.subject = subject || note.subject;
        note.content = content || note.content;
        note.tags = tags || note.tags;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        
        // Cleanup related data
        await Summary.deleteOne({ noteId: note._id });
        await Flashcard.deleteMany({ noteId: note._id });

        res.json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// AI Actions
const generateNoteSummary = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        const summaryData = await aiService.generateSummary(note.content);
        
        // Upsert summary
        const summary = await Summary.findOneAndUpdate(
            { noteId: note._id },
            { 
                noteId: note._id, 
                shortSummary: summaryData.shortSummary, 
                bulletSummary: summaryData.bulletSummary 
            },
            { new: true, upsert: true }
        );
        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteSummary = async (req, res) => {
    try {
        // Ensure user owns note
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        const summary = await Summary.findOne({ noteId: req.params.id });
        res.json(summary || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateNoteFlashcards = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        const flashcardsData = await aiService.generateFlashcards(note.content);
        
        // Delete old flashcards for this note? Or append? Usually regenerate implies replace or user manages them.
        // Let's replace for simplicity or add check. Prompt said "Store flashcards in DB".
        // I'll assume we delete old ones to avoid duplicates if re-generating.
        await Flashcard.deleteMany({ noteId: note._id });

        const createdCards = await Flashcard.insertMany(flashcardsData.map(card => ({
            noteId: note._id,
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty
        })));

        res.json(createdCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    generateNoteSummary,
    getNoteSummary,
    generateNoteFlashcards
};
