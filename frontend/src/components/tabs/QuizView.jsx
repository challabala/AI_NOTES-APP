import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFlashcards } from '../../features/flashcards/flashcardSlice';
import { startQuizSession, submitQuizAnswer, resetQuiz } from '../../features/quiz/quizSlice';
import { Loader, Check, X, RotateCcw, Play } from 'lucide-react';
import { toast } from 'react-toastify';

const QuizView = ({ noteId }) => {
    const dispatch = useDispatch();
    const { flashcards, isLoading: isCardsLoading } = useSelector((state) => state.flashcards);
    const { currentSession } = useSelector((state) => state.quiz);
    
    // Quiz State
    const [started, setStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        dispatch(getFlashcards(noteId));
        return () => {
            dispatch(resetQuiz());
        }
    }, [dispatch, noteId]);

 

    const startQuiz = async () => {
        try {
            await dispatch(startQuizSession({ noteId })).unwrap();
            setStarted(true);
            setCurrentIndex(0);
            setFinished(false);
            setShowAnswer(false);
            toast.info('Quiz started! Good luck.');
        } catch (err) {
            toast.error(err || 'Failed to start quiz');
        }
    };

    const handleAnswer = (isCorrect) => {
        if (currentSession) {
            dispatch(submitQuizAnswer({ sessionId: currentSession._id, correct: isCorrect }))
                .unwrap()
                .catch(err => console.error("Failed to save answer", err)); // Fail silently or log, toast might be annoying on every card
        }
        
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);
        } else {
            setFinished(true);
            toast.success('Quiz complete!');
        }
    };

    if (isCardsLoading) return <div className="p-8 flex justify-center"><Loader className="animate-spin text-primary"/></div>;

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 mb-4">No flashcards available for this quiz. Generate them in the Flashcards tab first.</p>
            </div>
        );
    }

    if (!started || finished) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                {finished ? (
                    <>
                        <div className="text-4xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
                        {currentSession && (
                            <div className="flex gap-8 my-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-500">{currentSession.correctCount}</div>
                                    <div className="text-sm text-slate-500">Known</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-500">{currentSession.incorrectCount}</div>
                                    <div className="text-sm text-slate-500">Review</div>
                                </div>
                            </div>
                        )}
                        <button onClick={startQuiz} className="btn-primary flex items-center gap-2">
                             <RotateCcw size={18} /> Restart Quiz
                        </button>
                    </>
                ) : (
                    <>
                        <div className="text-4xl mb-4">🎓</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to test your knowledge?</h2>
                        <p className="text-slate-500 mb-6">You have {flashcards.length} cards to review.</p>
                        <button onClick={startQuiz} className="btn-primary px-8 flex items-center gap-2">
                             <Play size={18} /> Start Quiz
                        </button>
                    </>
                )}
            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] max-w-2xl mx-auto">
            <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden min-h-[300px] flex flex-col">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between text-sm text-slate-500 font-medium">
                    <span>Card {currentIndex + 1} of {flashcards.length}</span>
                    <span>{Math.round(((currentIndex) / flashcards.length) * 100)}% Complete</span>
                </div>
                
                <div className="flex-1 p-8 flex items-center justify-center flex-col text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        {showAnswer ? "Answer" : "Question"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium text-slate-800 leading-normal">
                        {showAnswer ? currentCard.answer : currentCard.question}
                    </h3>
                </div>

                {!showAnswer ? (
                    <button 
                        onClick={() => setShowAnswer(true)}
                        className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium border-t border-slate-100 transition-colors"
                    >
                        Show Answer
                    </button>
                ) : (
                    <div className="flex border-t border-slate-100">
                        <button 
                            onClick={() => handleAnswer(false)}
                            className="flex-1 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <X size={18} /> Needs Review
                        </button>
                        <div className="w-px bg-slate-200"></div>
                        <button 
                            onClick={() => handleAnswer(true)}
                            className="flex-1 py-4 bg-green-50 hover:bg-green-100 text-green-600 font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Check size={18} /> I Knew It
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizView;
