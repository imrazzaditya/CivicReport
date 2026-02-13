import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import StatusBadge from '../components/StatusBadge';
import ProgressStepper from '../components/ProgressStepper';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi';

const TicketDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/tickets/${id}`);
                setTicket(data.data);
            } catch { setError('Ticket not found.'); }
            finally { setLoading(false); }
        })();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this ticket?')) return;
        try {
            await api.delete(`/tickets/${id}`);
            navigate('/dashboard/my-tickets');
        } catch { setError('Failed to delete ticket.'); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600" /></div>;
    if (error) return <div className="card text-center py-12 text-red-600">{error}</div>;
    if (!ticket) return null;

    const isOwner = user?._id === ticket.createdBy?._id;
    const canEdit = isOwner && ticket.status !== 'Resolved';

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeInUp">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-surface-800">{ticket.title}</h1>
                    <div className="flex items-center gap-3 mt-2 text-sm text-surface-500">
                        <span className="flex items-center gap-1"><HiOutlineUser className="w-4 h-4" />{ticket.createdBy?.name}</span>
                        <span className="flex items-center gap-1"><HiOutlineCalendar className="w-4 h-4" />{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><HiOutlineLocationMarker className="w-4 h-4" />{ticket.location}</span>
                    </div>
                </div>
                <StatusBadge status={ticket.status} />
            </div>

            {/* Progress Stepper */}
            <div className="card"><ProgressStepper currentStatus={ticket.status} /></div>

            {/* Description */}
            <div className="card">
                <h2 className="font-semibold text-surface-800 mb-2">Description</h2>
                <p className="text-surface-600 whitespace-pre-wrap">{ticket.description}</p>
                <div className="mt-3"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface-100 text-surface-600">{ticket.category}</span></div>
            </div>

            {/* Media */}
            {ticket.media?.length > 0 && (
                <div className="card">
                    <h2 className="font-semibold text-surface-800 mb-3">Attachments</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {ticket.media.map((m, i) => (
                            <div key={i}>
                                {m.resourceType === 'video' ? (
                                    <video src={m.url} controls className="w-full rounded-lg" />
                                ) : (
                                    <a href={m.url} target="_blank" rel="noreferrer"><img src={m.url} alt="" className="w-full h-40 object-cover rounded-lg border border-surface-200 hover:opacity-90 transition-opacity" /></a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Progress Notes */}
            {ticket.progressNotes?.length > 0 && (
                <div className="card">
                    <h2 className="font-semibold text-surface-800 mb-3">Progress Notes</h2>
                    <div className="space-y-3">
                        {ticket.progressNotes.map((n, i) => (
                            <div key={i} className="flex gap-3 animate-slideIn" style={{ animationDelay: `${i * 50}ms` }}>
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-surface-700">{n.note}</p>
                                    <p className="text-xs text-surface-400 mt-0.5">{n.updatedBy?.name} • {new Date(n.date).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            {isOwner && (
                <div className="flex gap-3">
                    {canEdit && <Link to={`/dashboard/edit/${id}`} className="btn-secondary"><HiOutlinePencil className="w-4 h-4 mr-1.5" />Edit</Link>}
                    <button onClick={handleDelete} className="btn-danger"><HiOutlineTrash className="w-4 h-4 mr-1.5" />Delete</button>
                </div>
            )}
        </div>
    );
};

export default TicketDetail;
