import { Link } from 'react-router-dom';
import { HiOutlineShieldCheck, HiArrowRight, HiOutlineCamera, HiOutlineLocationMarker, HiOutlineDocumentDownload } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();

    const categories = [
        { name: 'Pothole', icon: '🔴' },
        { name: 'Garbage', icon: '🟡' },
        { name: 'Streetlight', icon: '💡' },
        { name: 'Water', icon: '💧' },
        { name: 'Encroachment', icon: '🚧' },
        { name: 'Noise', icon: '🔊' },
        { name: 'Stray Animals', icon: '🐕' },
        { name: 'Other', icon: '📋' },
    ];

    const testimonials = [
        { name: 'Rahul S.', city: 'Bengaluru', quote: 'Reported a pothole, got my certificate, and it was fixed in 4 days. Incredible tool!', stars: '⭐⭐⭐⭐⭐' },
        { name: 'Priya K.', city: 'Mumbai', quote: 'Finally a way to hold the local councillor accountable. Very easy to use.', stars: '⭐⭐⭐⭐⭐' },
        { name: 'Amit V.', city: 'Delhi', quote: 'The auto-fetch of leader details is magic. I didn’t even know who my MLA was.', stars: '⭐⭐⭐⭐⭐' },
    ];

    return (
        <div className="min-h-screen bg-civic-background font-sans text-civic-textPrimary">
            {/* Top Saffron Bar */}
            <div className="bg-civic-saffron text-white text-sm font-semibold py-1.5 text-center px-4 tracking-wide">
                🇮🇳 Empowering citizens to hold their local leaders accountable
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-30 h-[72px] bg-white/90 backdrop-blur-md border-b border-civic-border px-6 md:px-12 flex items-center justify-between shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary" />
                    <span className="text-xl font-bold text-civic-primary tracking-tight">
                        CivicReport
                    </span>
                </Link>
                
                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-civic-textPrimary">
                    <a href="#how-it-works" className="hover:text-civic-primary transition-colors">How It Works</a>
                    <Link to="/track" className="hover:text-civic-primary transition-colors">Track Issue</Link>
                    <Link to="/about" className="hover:text-civic-primary transition-colors">About</Link>
                </div>

                <div className="flex items-center">
                    <Link to={user ? '/dashboard/create' : '/register'} className="btn-primary">
                        Report an Issue
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-20 text-center max-w-[720px] mx-auto flex flex-col items-center">
                <h1 className="text-[40px] md:text-[48px] font-bold text-civic-textPrimary leading-[1.15] tracking-[-0.5px] mb-6 animate-fadeInUp">
                    Report Civic Issues. Get Proof. Make Leaders Accountable.
                </h1>
                <p className="text-lg text-civic-textSecondary mb-10 max-w-[600px] animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                    Upload photos, get a geotagged certificate with your leader's details, and generate a legal complaint — in 60 seconds.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                    <Link to={user ? '/dashboard/create' : '/register'} className="btn-primary h-12 w-full sm:w-[220px] text-[15px]">
                        Report an Issue Now
                    </Link>
                    <Link to="/track" className="btn-secondary h-12 w-full sm:w-[220px] text-[15px]">
                        Track Your Report
                    </Link>
                </div>
                <div className="mt-12 text-[13px] font-semibold text-civic-textSecondary flex flex-wrap justify-center items-center gap-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                    <span>📋 12,400+ issues reported</span>
                    <span className="hidden sm:inline">•</span>
                    <span>🗺️ 500+ cities</span>
                    <span className="hidden sm:inline">•</span>
                    <span>✅ 3,200 resolved</span>
                </div>
            </section>

            {/* Live Issues Ticker */}
            <div className="w-full bg-civic-textPrimary overflow-hidden py-3">
                <div className="whitespace-nowrap flex items-center gap-8 animate-marquee">
                    {/* Repeated content for smooth scrolling effect */}
                    <span className="text-white text-sm font-medium">🔴 Pothole — Bengaluru MG Road</span>
                    <span className="text-white text-sm font-medium">🟡 Garbage — Delhi Rohini</span>
                    <span className="text-white text-sm font-medium">🟢 Resolved — Mumbai Dharavi Water Leak</span>
                    <span className="text-white text-sm font-medium">🔴 Streetlight — Chennai Anna Nagar</span>
                    <span className="text-white text-sm font-medium">🔴 Pothole — Bengaluru MG Road</span>
                    <span className="text-white text-sm font-medium">🟡 Garbage — Delhi Rohini</span>
                    <span className="text-white text-sm font-medium">🟢 Resolved — Mumbai Dharavi Water Leak</span>
                </div>
            </div>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
                <h2 className="text-[28px] font-bold text-center mb-12">3 Steps to Accountability</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card relative pt-10">
                        <div className="absolute top-0 left-0 w-8 h-8 bg-civic-primary text-white rounded-br-card rounded-tl-card flex items-center justify-center font-bold text-sm">1</div>
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-civic-primary mb-6">
                            <HiOutlineCamera className="w-8 h-8" />
                        </div>
                        <h3 className="text-[22px] font-semibold mb-3">Upload Proof</h3>
                        <p className="text-civic-textSecondary">Take a clear photo or video of the issue. We'll automatically geotag it and record the timestamp.</p>
                    </div>
                    <div className="card relative pt-10">
                        <div className="absolute top-0 left-0 w-8 h-8 bg-civic-primary text-white rounded-br-card rounded-tl-card flex items-center justify-center font-bold text-sm">2</div>
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-civic-primary mb-6">
                            <HiOutlineLocationMarker className="w-8 h-8" />
                        </div>
                        <h3 className="text-[22px] font-semibold mb-3">We Find Your Leader</h3>
                        <p className="text-civic-textSecondary">Just enter your PIN code. Our system automatically fetches your local elected representative's details.</p>
                    </div>
                    <div className="card relative pt-10">
                        <div className="absolute top-0 left-0 w-8 h-8 bg-civic-primary text-white rounded-br-card rounded-tl-card flex items-center justify-center font-bold text-sm">3</div>
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-civic-primary mb-6">
                            <HiOutlineDocumentDownload className="w-8 h-8" />
                        </div>
                        <h3 className="text-[22px] font-semibold mb-3">Download Certificate</h3>
                        <p className="text-civic-textSecondary">Get a formal PDF certificate with a unique complaint ID, ready to be sent as a legal notice or shared online.</p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-6 bg-white border-y border-civic-border">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[28px] font-bold text-center mb-10">What can you report?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {categories.map((c, i) => (
                            <div key={i} className="flex flex-col items-center justify-center h-24 border border-civic-border rounded-xl hover:border-civic-primary hover:shadow-card transition-all cursor-pointer">
                                <span className="text-2xl mb-2">{c.icon}</span>
                                <span className="text-sm font-semibold text-civic-textPrimary">{c.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <h2 className="text-[28px] font-bold text-center mb-12">Citizen Impact</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="card bg-white p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-civic-primary text-white flex items-center justify-center font-bold text-lg">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-civic-textPrimary">{t.name}</div>
                                    <div className="text-xs text-civic-textSecondary">{t.city}</div>
                                </div>
                            </div>
                            <p className="text-sm text-civic-textPrimary italic mb-4">"{t.quote}"</p>
                            <div className="text-sm tracking-widest">{t.stars}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-civic-textPrimary text-civic-textMuted py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <HiOutlineShieldCheck className="w-6 h-6 text-civic-saffron" />
                            <span className="text-lg font-bold text-white tracking-tight">CivicReport</span>
                        </div>
                        <p className="text-sm">Empowering Indian citizens with digital tools for civic accountability and transparent governance.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/track" className="hover:text-white transition-colors">Track an Issue</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>support@civicreport.in</li>
                            <li>+91 98765 43210</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto pt-8 border-t border-gray-700 text-center text-sm">
                    Made with ❤️ for India | © 2025 CivicReport
                </div>
            </footer>
        </div>
    );
};

export default Home;
