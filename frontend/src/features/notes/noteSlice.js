import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    notes: [],
    currentNote: null,
    summary: null, // For the current note
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new note
export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        const response = await api.post('/notes', noteData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user notes
export const getNotes = createAsyncThunk('notes/getAll', async (searchQuery, thunkAPI) => {
    try {
        let url = '/notes';
        if (searchQuery) url += `?search=${searchQuery}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get single note
export const getNote = createAsyncThunk('notes/getOne', async (id, thunkAPI) => {
    try {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Generate Summary
export const generateSummary = createAsyncThunk('notes/generateSummary', async (noteId, thunkAPI) => {
    try {
        // Post to generate
        await api.post(`/notes/${noteId}/generate-summary`);
        // Then fetch it to be sure
        const response = await api.get(`/notes/${noteId}/summary`);
        return response.data;
    } catch (error) {
         const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Summary
export const getSummary = createAsyncThunk('notes/getSummary', async (noteId, thunkAPI) => {
    try {
        const response = await api.get(`/notes/${noteId}/summary`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.notes.push(action.payload);
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.notes = action.payload;
            })
             .addCase(getNote.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.currentNote = action.payload;
            })
             .addCase(generateSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
            })
             .addCase(getSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
            });
    },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
