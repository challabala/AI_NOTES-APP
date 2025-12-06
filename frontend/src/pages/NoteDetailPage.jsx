import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, reset } from '../features/notes/noteSlice';
import NoteView from '../components/tabs/NoteView';
import SummaryView from '../components/tabs/SummaryView';
import FlashcardView from '../components/tabs/FlashcardView';
import QuizView from '../components/tabs/QuizView';
import { Loader } from 'lucide-react';

const NoteDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { currentNote, isLoading, isError, message } = useSelector((state) => state.notes);
    const [activeTab, setActiveTab] = useState('note'); 

    useEffect(() => {
        if (isError) {
            console.error(message);
        }
        dispatch(getNote(id));
    }, [dispatch, id, isError, message]);

    if(isLoading) return <div className="flex justify-center items-center h-full text-slate-400"><Loader className="animate-spin mr-2"/> Loading Note...</div>;
    if(!currentNote) return <div className="p-8 text-center text-slate-500">Note not found.</div>;

    const tabs = [
        { id: 'note', label: 'Note' },
        { id: 'summary', label: 'Summary' },
        { id: 'flashcards', label: 'Flashcards' },
        { id: 'quiz', label: 'Quiz' },
    ];

    return (
        <div className="h-full flex flex-col">
            <header className="mb-4">
                <nav className="flex gap-4 border-b border-slate-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id 
                                ? 'border-primary text-primary' 
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>

            <div className="flex-1 overflow-y-auto">
                {activeTab === 'note' && <NoteView note={currentNote} />}
                {activeTab === 'summary' && <SummaryView noteId={id} />}
                {activeTab === 'flashcards' && <FlashcardView noteId={id} />}
                {activeTab === 'quiz' && <QuizView noteId={id} />}
            </div>
        </div>
    );
};

export default NoteDetailPage;
