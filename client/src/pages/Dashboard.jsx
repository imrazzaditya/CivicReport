import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import TicketCard from '../components/TicketCard';
import {
    HiOutlinePlusCircle,
    HiOutlineClipboardList,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineXCircle
} from 'react-icons/hi';

const Dashboard = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const { data } = await api.get('/tickets/my');
                setTickets(data.data);
            } catch (err) {
                console.error('Failed to fetch tickets:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const stats = {
        total: tickets.length,
        submitted: tickets.filter((t) => t.status === 'Submitted').length,
        inProgress: tickets.filter((t) => t.status === 'InProgress' || t.status === 'In Progress').length,
        resolved: tickets.filter((t) => t.status === 'Resolved').length,
    };

    const statCards = [
        { label: 'Total Tickets', value: stats.total, Icon: HiOutlineClipboardList, color: 'bg-blue-50 text-civic-primary border-blue-100' },
        { label: 'Submitted', value: stats.submitted, Icon: HiOutlineClock, color: 'bg-gray-50 text-gray-600 border-gray-100' },
        { label: 'In Progress', value: stats.inProgress, Icon: HiOutlineClock, color: 'bg-amber-50 text-civic-warning border-amber-100' },
        { label: 'Resolved', value: stats.resolved, Icon: HiOutlineCheckCircle, color: 'bg-green-50 text-civic-success border-green-100' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-civic-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-4 space-y-10 animate-fadeInUp">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-civic-border pb-8">
                <div>
                    <h1 className="text-[32px] font-bold text-civic-textPrimary tracking-tight flex items-center gap-3">
                        Welcome, {user?.name} 👋
                    </h1>
                    <p className="text-civic-textSecondary mt-1">Here is a quick summary of your reported issues and their progress.</p>
                </div>
                <Link to="/dashboard/create" className="btn-primary h-12 shadow-lg shadow-blue-100">
                    <HiOutlinePlusCircle className="w-5 h-5 mr-2" />
                    Report a New Issue
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((s, i) => (
                    <div key={i} className="bg-white border border-civic-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl border ${s.color} flex items-center justify-center`}>
                                <s.Icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[28px] font-bold text-civic-textPrimary leading-none mb-1">{s.value}</p>
                                <p className="text-sm font-semibold text-civic-textSecondary uppercase tracking-wider">{s.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-civic-textPrimary">Recent Activity</h2>
                    <Link to="/dashboard/my-tickets" className="text-sm font-bold text-civic-primary hover:underline">
                        View All Reports &rarr;
                    </Link>
                </div>

                {tickets.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-civic-border rounded-2xl py-16 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HiOutlineClipboardList className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-civic-textPrimary mb-2">No reports yet</h3>
                        <p className="text-civic-textSecondary max-w-xs mx-auto mb-8 text-sm">Be the change you want to see. Report the first issue in your community today.</p>
                        <Link to="/dashboard/create" className="btn-secondary h-10 text-sm">
                            Submit My First Report
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tickets.slice(0, 5).map((ticket) => (
                            <TicketCard key={ticket.id || ticket._id} ticket={ticket} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
