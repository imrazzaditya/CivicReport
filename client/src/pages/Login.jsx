import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineShieldCheck } from 'react-icons/hi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left — branding panel */}
            <div className="hidden lg:flex lg:w-[55%] bg-civic-primary relative overflow-hidden flex-col justify-center p-20">
                {/* Abstract shapes */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                            <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">CivicReport</span>
                    </div>

                    <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-6">
                        Empowering Communities,<br />One Report at a Time.
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md leading-relaxed opacity-90">
                        Join thousands of citizens making their voices heard. Securely report issues and track resolutions in real-time.
                    </p>

                    <div className="mt-16 grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">50k+</div>
                            <div className="text-blue-200 text-sm font-medium">Issues Resolved</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">100%</div>
                            <div className="text-blue-200 text-sm font-medium">Verified Submissions</div>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative bar */}
                <div className="absolute bottom-10 left-20 right-20 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Right — login form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <div className="lg:hidden flex items-center gap-2 mb-8">
                            <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary" />
                            <span className="text-xl font-bold text-civic-primary tracking-tight">CivicReport</span>
                        </div>
                        <h2 className="text-3xl font-bold text-civic-textPrimary tracking-tight">Welcome Back</h2>
                        <p className="text-civic-textSecondary mt-2">Enter your credentials to access your dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2 animate-shake">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-civic-textPrimary mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary transition-colors" />
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-12 h-14 bg-gray-50 border-transparent focus:bg-white"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-bold text-civic-textPrimary">
                                    Password
                                </label>
                                <a href="#" className="text-xs font-bold text-civic-primary hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-civic-textMuted w-5 h-5 group-focus-within:text-civic-primary transition-colors" />
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12 pr-12 h-14 bg-gray-50 border-transparent focus:bg-white"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-civic-textMuted hover:text-civic-textPrimary"
                                >
                                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-civic-primary focus:ring-civic-primary" />
                            <label htmlFor="remember" className="text-sm font-medium text-civic-textSecondary">Keep me signed in</label>
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full h-14 text-base shadow-xl shadow-blue-100"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            ) : (
                                'Sign In to Account'
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm font-medium text-civic-textSecondary">
                        Don't have an account yet?{' '}
                        <Link to="/register" className="text-civic-primary font-bold hover:underline">
                            Create your account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
