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
        <div className="space-y-6 animate-fadeInUp">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-surface-800">My Tickets</h1>

                <div className="flex items-center gap-2">
                    <HiOutlineFilter className="w-4 h-4 text-surface-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input-field w-auto text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="Submitted">Submitted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
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
