import { useEffect, useState } from 'react';
import api from '../utils/api';
import TicketCard from '../components/TicketCard';
import { HiOutlineClipboardList, HiOutlineFilter } from 'react-icons/hi';

/**
 * MyTickets — full list of tickets submitted by the logged-in user, with status filter.
 */
const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
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

    const filtered = filterStatus
        ? tickets.filter((t) => t.status === filterStatus)
        : tickets;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-4 space-y-8 animate-fadeInUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-civic-border pb-6">
                <div>
                    <h1 className="text-[32px] font-bold text-civic-textPrimary tracking-tight">My Reports</h1>
                    <p className="text-civic-textSecondary mt-1">Track the progress of issues you've reported.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <HiOutlineFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-civic-textMuted" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="input-field pl-9 py-2 text-sm w-[180px] h-10"
                        >
                            <option value="">All Statuses</option>
                            <option value="Submitted">Submitted</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="card text-center py-12">
                    <HiOutlineClipboardList className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                    <p className="text-surface-500">
                        {filterStatus ? `No tickets with status "${filterStatus}".` : "You haven\u0027t reported any issues yet."}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTickets;
