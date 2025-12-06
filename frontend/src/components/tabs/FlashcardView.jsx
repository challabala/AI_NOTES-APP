import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFlashcards, generateFlashcards, updateFlashcardStatus, deleteFlashcard } from '../../features/flashcards/flashcardSlice';
import { Sparkles, Loader, Trash2, CheckCircle, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const FlashcardView = ({ noteId }) => {
    const dispatch = useDispatch();
    const { flashcards, isLoading } = useSelector((state) => state.flashcards);

    useEffect(() => {
        dispatch(getFlashcards(noteId));
    }, [dispatch, noteId]);



    const onGenerate = () => {
        dispatch(generateFlashcards(noteId))
            .unwrap()
            .then(() => toast.success('Flashcards generated successfully!'))
            .catch((err) => toast.error(err || 'Failed to generate flashcards'));
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader className="animate-spin text-primary"/></div>;

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-slate-300">
                <Sparkles className="text-secondary mb-4" size={48} />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No flashcards yet</h3>
                <p className="text-slate-500 mb-6 text-center max-w-sm">Use AI to generate Q&A flashcards from your note content.</p>
                <button onClick={onGenerate} className="btn-primary bg-secondary hover:bg-pink-600 flex items-center gap-2">
                    <Sparkles size={18} />
                    Generate Flashcards
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-700 text-lg flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Flashcards ({flashcards.length})
                </h3>
                <button onClick={onGenerate} className="text-xs btn-secondary flex items-center gap-1 hover:text-primary">
                     <Sparkles size={14} /> Regenerate
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {flashcards.map((card) => (
                    <FlashcardItem key={card._id} card={card} onDelete={() => {
                        if(window.confirm('Delete this card?')) {
                            dispatch(deleteFlashcard(card._id))
                                .unwrap()
                                .then(() => toast.success('Deleted'))
                                .catch(() => toast.error('Failed to delete'));
                        }
                    }} />
                ))}
            </div>
        </div>
    );
};

// Sub-component for individual card with flip logic
const FlashcardItem = ({ card, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="group perspective-1000 h-64 w-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                            card.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            card.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {card.difficulty}
                        </span>
                        <HelpCircle size={18} className="text-slate-300" />
                    </div>
                    <div className="text-center font-medium text-slate-800 text-lg leading-relaxed">
                        {card.question}
                    </div>
                    <div className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest">
                        Click to Flip
                    </div>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-inner border border-indigo-100 p-6 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Answer</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className="p-1 hover:bg-red-50 rounded text-slate-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="text-center font-medium text-indigo-900 leading-relaxed overflow-y-auto max-h-[80%] custom-scrollbar">
                        {card.answer}
                    </div>
                     <div className="text-center text-xs text-indigo-300 font-semibold uppercase tracking-widest">
                        Click to Flip Back
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardView;
