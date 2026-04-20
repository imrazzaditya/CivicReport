import { Link } from 'react-router-dom';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const About = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-civic-background font-sans text-civic-textPrimary">
            {/* Navbar */}
            <nav className="sticky top-0 z-30 h-[72px] bg-white/90 backdrop-blur-md border-b border-civic-border px-6 md:px-12 flex items-center justify-between shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary" />
                    <span className="text-xl font-bold text-civic-primary tracking-tight">CivicReport</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-civic-textPrimary">
                    <Link to="/track" className="hover:text-civic-primary transition-colors">Track Issue</Link>
                    <Link to="/about" className="text-civic-primary transition-colors">About</Link>
                </div>
                <div className="flex items-center">
                    <Link to={user ? '/dashboard/create' : '/register'} className="btn-primary">Report an Issue</Link>
                </div>
            </nav>

            <div className="w-full bg-civic-saffron text-white text-center py-2 text-sm font-semibold tracking-wide">
                We are a citizen-led initiative, completely independent and not affiliated with any political party.
            </div>

            <div className="max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-[36px] font-bold text-center mb-12 max-w-3xl mx-auto leading-tight">
                    "Our mission is to bridge the gap between citizens and their leaders through transparent, verifiable digital reporting."
                </h1>

                <h2 className="text-[28px] font-bold text-center mb-8 mt-24">Why CivicReport?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card">
                        <div className="w-12 h-12 bg-blue-50 text-civic-primary rounded-xl flex items-center justify-center text-xl font-bold mb-4">1</div>
                        <h3 className="text-lg font-bold mb-2">Verified Proof</h3>
                        <p className="text-sm text-civic-textSecondary leading-relaxed">Every photo is geotagged and timestamped, creating an immutable record of the civic issue that cannot be denied or ignored.</p>
                    </div>
                    <div className="card">
                        <div className="w-12 h-12 bg-blue-50 text-civic-primary rounded-xl flex items-center justify-center text-xl font-bold mb-4">2</div>
                        <h3 className="text-lg font-bold mb-2">Automatic Escalation</h3>
                        <p className="text-sm text-civic-textSecondary leading-relaxed">Our system automatically identifies your local elected representative using your PIN code and generates a formal notice addressed to them.</p>
                    </div>
                    <div className="card">
                        <div className="w-12 h-12 bg-blue-50 text-civic-primary rounded-xl flex items-center justify-center text-xl font-bold mb-4">3</div>
                        <h3 className="text-lg font-bold mb-2">Legal Validity</h3>
                        <p className="text-sm text-civic-textSecondary leading-relaxed">The auto-generated PDF certificate serves as a valid complaint that can be used for legal escalation or RTI applications if the issue remains unresolved.</p>
                    </div>
                    <div className="card">
                        <div className="w-12 h-12 bg-blue-50 text-civic-primary rounded-xl flex items-center justify-center text-xl font-bold mb-4">4</div>
                        <h3 className="text-lg font-bold mb-2">Public Tracking</h3>
                        <p className="text-sm text-civic-textSecondary leading-relaxed">All reported issues are publicly visible, creating a transparent dashboard of civic performance for your neighborhood and city.</p>
                    </div>
                </div>

                <h2 className="text-[28px] font-bold text-center mb-8 mt-24">Our Team</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="text-center p-6 border border-civic-border rounded-xl bg-white shadow-sm">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                            <h3 className="font-bold text-lg">Founder Name</h3>
                            <p className="text-sm text-civic-textSecondary">Co-founder & Role</p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 pt-12 border-t border-civic-border text-center">
                    <h2 className="text-sm font-bold text-civic-textMuted uppercase tracking-widest mb-8">Featured In</h2>
                    <div className="flex justify-center gap-12 opacity-50 grayscale">
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-civic-textPrimary text-civic-textMuted py-8 text-center text-sm">
                Made with ❤️ for India | © 2025 CivicReport
            </footer>
        </div>
    );
};

export default About;
