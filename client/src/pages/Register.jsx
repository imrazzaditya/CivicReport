import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';

/**
 * Register — signup page for new citizens (or admins).
 */
const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left — branding panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-600 via-emerald-700 to-teal-900 relative overflow-hidden">
                <div className="absolute top-32 left-16 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-16 right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col justify-center p-16 text-white">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold mb-8">
                        C
                    </div>
                    <h1 className="text-4xl font-extrabold leading-tight mb-4">
                        Join the<br />CivicReport Community
                    </h1>
                    <p className="text-emerald-200 text-lg max-w-md">
                        Create an account to start reporting civic issues and driving change in your neighborhood.
                    </p>
                </div>
            </div>

            {/* Right — register form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md animate-fadeInUp">
                    <div className="text-center mb-8">
                        <div className="lg:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                            C
                        </div>
                        <h2 className="text-2xl font-bold text-surface-800">Create Account</h2>
                        <p className="text-surface-500 mt-1">Fill in your details to get started</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" />
                                <input
                                    id="register-name"
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" />
                                <input
                                    id="register-email"
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" />
                                <input
                                    id="register-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    minLength={6}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="input-field pl-10 pr-10"
                                    placeholder="Min. 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                                >
                                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" />
                                <input
                                    id="register-confirm-password"
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Re-enter password"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1.5">
                                Account Type
                            </label>
                            <select
                                id="register-role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="user">Citizen</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-surface-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
