import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import {
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlinePhotograph,
    HiOutlineChevronRight,
} from 'react-icons/hi';

const TicketCard = ({ ticket }) => {
    // Mapping categories to icons or emojis
    const categoryIcons = {
        Road: '🔴',
        Water: '💧',
        Electricity: '⚡',
        Garbage: '🟡',
        Other: '📋',
    };

    return (
        <Link
            to={`/dashboard/ticket/${ticket.id || ticket._id}`}
            className="group block bg-white border border-civic-border rounded-xl p-5 hover:border-civic-primary hover:shadow-card transition-all duration-200 animate-fadeInUp"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    {/* Category Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        {categoryIcons[ticket.category] || '📋'}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-civic-textPrimary text-lg group-hover:text-civic-primary transition-colors truncate">
                                {ticket.title}
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <StatusBadge status={ticket.status} />
                                {ticket.isVerified && (
                                    <span className="flex items-center gap-1 bg-blue-50 text-civic-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                                        <HiOutlineShieldCheck className="w-3 h-3" />
                                        VERIFIED
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-civic-textSecondary line-clamp-1 mb-3">
                            {ticket.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-civic-textMuted">
                            <span className="flex items-center gap-1">
                                <HiOutlineLocationMarker className="w-4 h-4" />
                                {ticket.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <HiOutlineCalendar className="w-4 h-4" />
                                {new Date(ticket.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </span>
                            {ticket.media?.length > 0 && (
                                <span className="flex items-center gap-1">
                                    <HiOutlinePhotograph className="w-4 h-4" />
                                    {ticket.media.length} Photo{ticket.media.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end sm:block">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-civic-primary group-hover:text-white transition-all">
                        <HiOutlineChevronRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TicketCard;
