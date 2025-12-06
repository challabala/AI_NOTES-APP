import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    currentSession: null,
    isLoading: false,
    isError: false,
    message: ''
};

export const startQuizSession = createAsyncThunk('quiz/start', async ({ noteId, subject }, thunkAPI) => {
    try {
        const response = await api.post('/quiz/start', { noteId, subject });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const submitQuizAnswer = createAsyncThunk('quiz/answer', async ({ sessionId, correct }, thunkAPI) => {
    try {
        const response = await api.post(`/quiz/${sessionId}/answer`, { correct });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        resetQuiz: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(startQuizSession.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(startQuizSession.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentSession = action.payload;
            })
            .addCase(submitQuizAnswer.fulfilled, (state, action) => {
                state.currentSession = action.payload;
            });
    }
});

export const { resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
