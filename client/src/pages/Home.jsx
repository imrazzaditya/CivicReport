import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiOutlineShieldCheck,
    HiOutlineTruck,
    HiOutlineLightBulb,
    HiOutlineLocationMarker,
    HiOutlineStatusOnline,
    HiArrowRight,
} from 'react-icons/hi';

/**
 * Home — public landing page with hero section and feature highlights.
 */
const Home = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: <HiOutlineLocationMarker className="w-8 h-8" />,
            title: 'Report Issues',
            desc: 'Easily report road damage, water leakage, garbage, and more with photos & location.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: <HiOutlineStatusOnline className="w-8 h-8" />,
            title: 'Track Progress',
            desc: 'Get real-time status updates as authorities resolve your reported issues.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: <HiOutlineShieldCheck className="w-8 h-8" />,
            title: 'Trusted Platform',
            desc: 'Secure, transparent, and accountable civic issue management system.',
            color: 'from-emerald-500 to-teal-500',
        },
    ];

    const categories = [
        { name: 'Road Damage', emoji: '🛣️' },
        { name: 'Water Leakage', emoji: '💧' },
        { name: 'Electricity', emoji: '⚡' },
        { name: 'Garbage', emoji: '🗑️' },
        { name: 'Street Lights', emoji: '💡' },
        { name: 'Other', emoji: '📋' },
    ];

    return (
        <div className="min-h-screen">
            {/* Navbar for public page */}
            <nav className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-surface-200 px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        C
                    </div>
                    <span className="text-lg font-bold text-surface-800">
                        Civic<span className="text-primary-600">Report</span>
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    {user ? (
                        <Link to="/dashboard" className="btn-primary">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors"
                            >
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

                <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fadeInUp">
                        <HiOutlineLightBulb className="w-4 h-4" />
                        Making Cities Better, One Report at a Time
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-surface-900 leading-tight animate-fadeInUp">
                        Report Civic Issues.
                        <br />
                        <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                            Track Resolutions.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-surface-500 max-w-2xl mx-auto animate-fadeInUp">
                        Empower your community by reporting infrastructure issues like road damage,
                        water leaks, and more. Track progress transparently until resolution.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp">
                        <Link to={user ? '/dashboard/create' : '/register'} className="btn-primary text-base px-8 py-3 shadow-lg hover:shadow-xl">
                            Report an Issue <HiArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link to={user ? '/dashboard' : '/login'} className="btn-secondary text-base px-8 py-3">
                            View Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-surface-800 mb-12">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="card text-center group hover:-translate-y-1 transition-transform duration-300"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                                >
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-surface-800 mb-2">{f.title}</h3>
                                <p className="text-sm text-surface-500">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-6 bg-surface-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-surface-800 mb-10">
                        Issue Categories
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {categories.map((c, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                            >
                                <div className="text-3xl mb-2">{c.emoji}</div>
                                <div className="text-xs font-medium text-surface-600">{c.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 bg-surface-900 text-surface-400 text-sm text-center">
                <p>© {new Date().getFullYear()} CivicReport. Built for better communities.</p>
            </footer>
        </div>
    );
};

export default Home;
