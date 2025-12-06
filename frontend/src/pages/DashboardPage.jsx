import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🧠</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome to StudyAI</h1>
            <p className="text-slate-500 max-w-md mb-8">
                Select a note from the sidebar to view details, generate summaries, and practice with flashcards.
            </p>
            <Link to="/new-note" className="hidden md:inline-flex btn-primary">
                Create New Note
            </Link>
            {/* Mobile only hint */}
            <p className="md:hidden text-sm text-slate-400">
                (Tap the menu to see your notes)
            </p>
        </div>
    );
};

export default DashboardPage;
