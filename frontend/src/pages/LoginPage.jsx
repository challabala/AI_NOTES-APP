import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    if (isLoading) return <div className="flex justify-center mt-20">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-20 p-8 card bg-white">
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Welcome Back</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email Address"
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    className="input-field"
                    required
                />
                <button type="submit" className="w-full btn-primary mt-4">
                    Login
                </button>
            </form>
            <p className="text-center mt-4 text-slate-500">
                Don't have an account? <Link to="/register" className="text-primary font-medium">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
