import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { name, email, password } = formData;

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
        dispatch(register({ name, email, password }));
    };

    if (isLoading) return <div className="flex justify-center mt-20">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-20 p-8 card bg-white">
            <h1 className="text-3xl font-bold text-center mb-6 text-secondary">Join StudyAI</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Full Name"
                    className="input-field"
                    required
                />
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
                <button type="submit" className="w-full btn-primary bg-secondary hover:bg-pink-600 mt-4">
                    Register
                </button>
            </form>
            <p className="text-center mt-4 text-slate-500">
                Already have an account? <Link to="/login" className="text-secondary font-medium">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
