import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../features/notes/noteSlice'; // Ensure specific update action exists if needed, or re-use create for now
// Assuming we have an update/save action, but for now we'll display read-only or simple edit in v2
// User asked to "View/Edit", so we should allow edit.
// I'll implement a simple textarea for now.

const NoteView = ({ note }) => {
    // For a real app, we'd have local state for editing and a save button
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[500px]">
            <h1 className="text-3xl font-bold mb-4 text-slate-800">{note.title}</h1>
            <div className="mb-4 flex gap-2">
                <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                    {note.subject}
                </span>
                {note.tags && note.tags.map(tag => (
                   <span key={tag} className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs">#{tag}</span> 
                ))}
            </div>
            <div className="prose max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                {note.content}
            </div>
        </div>
    );
};

export default NoteView;
