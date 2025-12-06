import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import noteReducer from './features/notes/noteSlice';
import flashcardReducer from './features/flashcards/flashcardSlice';
import quizReducer from './features/quiz/quizSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: noteReducer,
        flashcards: flashcardReducer,
        quiz: quizReducer,
    },
});
