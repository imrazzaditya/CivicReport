import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineEye, HiOutlineEyeOff, HiOutlineShieldCheck } from 'react-icons/hi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left — branding panel */}
            <div className="hidden lg:flex lg:w-[45%] bg-civic-primary relative overflow-hidden flex-col justify-center p-16">
                <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-3 mb-12 w-fit">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                            <HiOutlineShieldCheck className="w-6 h-6 text-civic-primary" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CivicReport</span>
                    </Link>

                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
                        Be the Voice of<br />Your Community.
                    </h1>
                    
                    <div className="space-y-6 mt-12">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">✓</div>
                            <div>
                                <h4 className="text-white font-bold">Fast Reporting</h4>
                                <p className="text-blue-100 text-sm opacity-80">Submit issues in less than 2 minutes with GPS location.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">✓</div>
                            <div>
                                <h4 className="text-white font-bold">Direct Impact</h4>
                                <p className="text-blue-100 text-sm opacity-80">Reports are sent directly to the assigned local MLA/MP.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">✓</div>
                            <div>
                                <h4 className="text-white font-bold">Real-time Tracking</h4>
                                <p className="text-blue-100 text-sm opacity-80">Get notified as soon as your issue is picked up for resolution.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right — register form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16 overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-civic-textPrimary tracking-tight">Create Account</h2>
                        <p className="text-civic-textSecondary mt-2">Join the community and start driving change.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Full Name</label>
                                <div className="relative group">
                                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field pl-12 h-12 bg-gray-50 border-transparent focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Email Address</label>
                                <div className="relative group">
                                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input-field pl-12 h-12 bg-gray-50 border-transparent focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Password</label>
                                    <div className="relative group">
                                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="input-field pl-12 h-12 bg-gray-50 border-transparent focus:bg-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-civic-textPrimary mb-1.5">Confirm</label>
                                    <div className="relative group">
                                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="input-field pl-12 h-12 bg-gray-50 border-transparent focus:bg-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-xs font-bold text-civic-primary text-right -mt-2 hover:underline"
                            >
                                {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                            </button>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full h-14 text-base shadow-xl shadow-blue-100"
                            >
                                {loading ? 'Creating Account...' : 'Create My Account'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm font-medium text-civic-textSecondary">
                        Already have an account?{' '}
                        <Link to="/login" className="text-civic-primary font-bold hover:underline">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
