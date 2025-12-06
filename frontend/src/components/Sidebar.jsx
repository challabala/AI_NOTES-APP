import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes, reset } from '../features/notes/noteSlice'; // Ensure getNotes is exported
import { Link, useLocation } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { notes, isLoading } = useSelector((state) => state.notes);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-64px)] overflow-y-auto hidden md:flex flex-col">
            <div className="p-4 border-b border-slate-100 space-y-3">
                <Link to="/new-note" className="flex items-center justify-center gap-2 w-full btn-primary">
                    <Plus size={18} />
                    New Note
                </Link>
                <input 
                    type="text" 
                    placeholder="Search notes..." 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    onChange={(e) => dispatch(getNotes(e.target.value))}
                />
            </div>
            
            <div className="flex-1 p-2">
                {isLoading ? (
                    <p className="text-center text-slate-400 mt-4">Loading notes...</p>
                ) : (
                    <div className="space-y-1">
                        {notes.map((note) => (
                            <Link 
                                key={note._id}
                                to={`/notes/${note._id}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    location.pathname === `/notes/${note._id}` 
                                    ? 'bg-indigo-50 text-primary' 
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <FileText size={16} />
                                <div className="overflow-hidden">
                                     <span className="truncate block">{note.title}</span>
                                     <span className="text-xs text-slate-400 block truncate">{note.subject}</span>
                                </div>
                            </Link>
                        ))}
                        {notes.length === 0 && (
                            <p className="text-center text-sm text-slate-400 mt-10">No notes found.</p>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
