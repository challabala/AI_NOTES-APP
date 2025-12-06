import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 w-full">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                <span>🧠</span> StudyAI
            </Link>
            
            {user ? (
                <div className="flex items-center gap-6">
                    <span className="text-slate-600 font-medium">Hello, {user.name}</span>
                    <button 
                        onClick={onLogout} 
                        className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-slate-600 hover:text-primary font-medium">Login</Link>
                    <Link to="/register" className="btn-primary">Get Started</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
