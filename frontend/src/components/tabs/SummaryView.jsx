import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSummary, generateSummary } from '../../features/notes/noteSlice'; // Adjust import path
import { Sparkles, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const SummaryView = ({ noteId }) => {
    const dispatch = useDispatch();
    // Assuming summary is stored in notes slice
    const { summary, isLoading } = useSelector((state) => state.notes); 

    useEffect(() => {
        dispatch(getSummary(noteId));
    }, [dispatch, noteId]);



    const onGenerate = () => {
        dispatch(generateSummary(noteId))
            .unwrap()
            .then(() => toast.success('Summary generated successfully!'))
            .catch((err) => toast.error(err || 'Failed to generate summary'));
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader className="animate-spin text-primary"/></div>;

    if (!summary || (!summary.shortSummary && !summary.bulletSummary?.length)) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-slate-300">
                <Sparkles className="text-yellow-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No summary yet</h3>
                <p className="text-slate-500 mb-6 text-center max-w-sm">Use AI to generate a concise summary and bullet points for this note.</p>
                <button onClick={onGenerate} className="btn-primary flex items-center gap-2">
                    <Sparkles size={18} />
                    Generate Summary
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="card">
                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">📝</span> Short Summary
                </h3>
                <p className="text-slate-600 leading-relaxed">{summary.shortSummary}</p>
            </div>

            <div className="card">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Key Points
                </h3>
                <ul className="space-y-2">
                    {summary.bulletSummary && summary.bulletSummary.map((point, index) => (
                        <li key={index} className="flex gap-3 text-slate-700">
                            <span className="text-primary font-bold">•</span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="flex justify-end">
                <button onClick={onGenerate} className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                    <Sparkles size={14} /> Regenerate Summary
                </button>
            </div>
        </div>
    );
};

export default SummaryView;
