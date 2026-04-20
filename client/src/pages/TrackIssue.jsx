import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineSearch, HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi';

const TrackIssue = () => {
    const { user } = useAuth();
    const [complaintId, setComplaintId] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        // Mock result for UI demonstration
        setResult({
            id: complaintId,
            title: 'Large Pothole on Main Street',
            category: 'Road',
            location: 'Main Street, Sector 4',
            status: 'IN REVIEW',
            leader: 'Shri Ramesh Kumar (MLA)',
            timeline: [
                { status: 'Reported', date: '12 Apr 2025', active: true, done: true },
                { status: 'Under Review', date: '13 Apr 2025', active: true, done: false },
                { status: 'Resolved', date: 'Pending', active: false, done: false }
            ],
            photos: ['https://via.placeholder.com/150']
        });
    };

    return (
        <div className="min-h-screen bg-civic-background font-sans text-civic-textPrimary">
            {/* Navbar */}
            <nav className="sticky top-0 z-30 h-[72px] bg-white/90 backdrop-blur-md border-b border-civic-border px-6 md:px-12 flex items-center justify-between shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary" />
                    <span className="text-xl font-bold text-civic-primary tracking-tight">CivicReport</span>
                </Link>
                <div className="flex items-center">
                    <Link to={user ? '/dashboard/create' : '/register'} className="btn-primary">Report an Issue</Link>
                </div>
            </nav>

            <div className="max-w-[680px] mx-auto px-6 py-12">
                <h1 className="text-[28px] font-bold text-center mb-8">Track Your Complaint</h1>
                
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative mb-12">
                    <input 
                        type="text" 
                        value={complaintId}
                        onChange={(e) => setComplaintId(e.target.value)}
                        placeholder="Enter your Complaint ID (e.g. CR-10294)" 
                        className="w-full h-14 pl-6 pr-16 rounded-xl border-[1.5px] border-civic-border bg-white text-lg shadow-sm focus:outline-none focus:border-civic-primary focus:ring-[3px] focus:ring-blue-100 transition-all"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 w-10 bg-civic-primary hover:bg-civic-primaryDark text-white rounded-lg flex items-center justify-center transition-colors">
                        <HiOutlineSearch className="w-5 h-5" />
                    </button>
                </form>

                {/* Result Card */}
                {result && (
                    <div className="card mb-16 animate-fadeInUp">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-xs font-bold text-civic-textSecondary mb-1">COMPLAINT {result.id}</div>
                                <h2 className="text-xl font-bold text-civic-textPrimary">{result.title}</h2>
                                <div className="text-sm text-civic-textSecondary mt-1">{result.location} • {result.category}</div>
                            </div>
                            <span className="px-3 py-1 bg-amber-100 text-civic-warning text-xs font-bold rounded-badge uppercase border border-amber-300">
                                {result.status}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 my-8">
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-civic-textSecondary mb-4 uppercase tracking-wider">Timeline</h3>
                                <div className="relative border-l-2 border-civic-border ml-3 space-y-6">
                                    {result.timeline.map((step, i) => (
                                        <div key={i} className="relative pl-6">
                                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${step.active ? 'border-civic-primary' : 'border-gray-300'} ${step.done ? 'bg-civic-primary' : ''}`}></div>
                                            <div className={`font-semibold text-sm ${step.active ? 'text-civic-textPrimary' : 'text-civic-textMuted'}`}>{step.status}</div>
                                            <div className="text-xs text-civic-textMuted mt-0.5">{step.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-[120px] shrink-0">
                                <h3 className="text-sm font-bold text-civic-textSecondary mb-4 uppercase tracking-wider">Proof</h3>
                                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border border-civic-border">
                                    <img src={result.photos[0]} alt="Proof" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg border border-civic-border flex items-center justify-between mb-6">
                            <div>
                                <div className="text-xs text-civic-textSecondary font-semibold uppercase">Assigned To</div>
                                <div className="text-sm font-bold text-civic-textPrimary">{result.leader}</div>
                            </div>
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        </div>

                        <div className="flex gap-4">
                            <Link to={`/certificate/${result.id}`} className="btn-primary flex-1"><HiOutlineCheckCircle className="mr-2 w-4 h-4"/> Download Certificate</Link>
                            <button className="btn-danger flex-1">Escalate Issue</button>
                        </div>
                    </div>
                )}

                {/* Recently Resolved */}
                <div>
                    <h3 className="text-lg font-bold text-civic-textPrimary mb-6 flex items-center gap-2">
                        <HiOutlineClock className="w-5 h-5 text-civic-success" /> Recently Resolved
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-civic-border shadow-sm flex justify-between items-center hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer">
                                <div>
                                    <div className="font-semibold text-sm">Broken Streetlight fixed</div>
                                    <div className="text-xs text-civic-textSecondary mt-0.5">Chennai • Resolved in 2 days</div>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-civic-success text-[10px] font-bold rounded-badge uppercase">Resolved</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackIssue;
