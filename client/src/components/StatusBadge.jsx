const StatusBadge = ({ status }) => {
    const styles = {
        Submitted: 'bg-blue-100 text-civic-primary border-blue-200',
        InProgress: 'bg-amber-100 text-civic-warning border-amber-200',
        Resolved: 'bg-green-100 text-civic-success border-green-200',
        Rejected: 'bg-red-100 text-civic-accent border-red-200',
    };

    // Normalize status for key lookup (e.g. "In Progress" -> "InProgress")
    const statusKey = status?.replace(/\s/g, '') || 'Submitted';

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-badge text-[11px] font-bold uppercase tracking-wider border ${
                styles[statusKey] || 'bg-gray-100 text-gray-600 border-gray-200'
            }`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
