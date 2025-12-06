import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote, reset } from '../features/notes/noteSlice';
import { Loader, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const NewNotePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        content: '',
        tags: ''
    });
    const { title, subject, content, tags } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.notes);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess) {
            dispatch(reset());
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        dispatch(createNote({
            title,
            subject,
            content,
            tags: tagsArray
        }));
    };

    if (isLoading) return <div className="flex justify-center mt-20"><Loader className="animate-spin text-primary"/></div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100 h-full overflow-y-auto">
            <header className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-slate-800">Create New Note</h1>
            </header>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="input-field"
                            placeholder="e.g. Introduction to React"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={subject}
                            onChange={onChange}
                            className="input-field"
                            placeholder="e.g. Frontend Development"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={onChange}
                        className="input-field"
                        placeholder="e.g. react, hooks, javascript"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={onChange}
                        className="input-field min-h-[300px] font-mono text-sm leading-relaxed resize-none p-4"
                        placeholder="# Write your notes here..."
                        required
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8">
                        <Save size={18} />
                        Save Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewNotePage;
