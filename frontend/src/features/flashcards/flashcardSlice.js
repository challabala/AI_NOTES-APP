import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    flashcards: [],
    isLoading: false,
    isSuccess: false,
    message: '',
};

// Generate Flashcards
export const generateFlashcards = createAsyncThunk('flashcards/generate', async (noteId, thunkAPI) => {
    try {
        const response = await api.post(`/notes/${noteId}/generate-flashcards`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Flashcards for a note
export const getFlashcards = createAsyncThunk('flashcards/getAll', async (noteId, thunkAPI) => {
    try {
        const response = await api.get(`/notes/${noteId}/flashcards`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Update status
export const updateFlashcardStatus = createAsyncThunk('flashcards/updateStatus', async ({ id, status }, thunkAPI) => {
    try {
        const response = await api.patch(`/flashcards/${id}/status`, { status });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete flashcard
export const deleteFlashcard = createAsyncThunk('flashcards/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/flashcards/${id}`);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const flashcardSlice = createSlice({
    name: 'flashcard',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateFlashcards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(generateFlashcards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.flashcards = action.payload;
            })
            .addCase(getFlashcards.fulfilled, (state, action) => {
                state.flashcards = action.payload;
            })
            .addCase(updateFlashcardStatus.fulfilled, (state, action) => {
                const index = state.flashcards.findIndex(card => card._id === action.payload._id);
                if (index !== -1) {
                    state.flashcards[index] = action.payload;
                }
            })
            .addCase(deleteFlashcard.fulfilled, (state, action) => {
                state.flashcards = state.flashcards.filter(card => card._id !== action.payload);
            });
    },
});

export const { reset } = flashcardSlice.actions;
export default flashcardSlice.reducer;
