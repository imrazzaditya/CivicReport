import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiOutlineViewGrid,
    HiOutlinePlusCircle,
    HiOutlineClipboardList,
    HiOutlineChartBar,
    HiOutlineHome,
} from 'react-icons/hi';

const Sidebar = () => {
    const { isAdmin } = useAuth();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
            ? 'bg-blue-50 text-civic-primary shadow-sm ring-1 ring-blue-100'
            : 'text-civic-textSecondary hover:bg-gray-50 hover:text-civic-textPrimary'
        }`;

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-civic-border p-5 min-h-[calc(100vh-72px)]">
            <div className="space-y-2">
                <NavLink to="/dashboard" end className={linkClass}>
                    <HiOutlineViewGrid className="w-5 h-5" />
                    Dashboard
                </NavLink>

                {!isAdmin && (
                    <>
                        <NavLink to="/dashboard/create" className={linkClass}>
                            <HiOutlinePlusCircle className="w-5 h-5" />
                            Report Issue
                        </NavLink>
                        <NavLink to="/dashboard/my-tickets" className={linkClass}>
                            <HiOutlineClipboardList className="w-5 h-5" />
                            My Tickets
                        </NavLink>
                    </>
                )}

                {isAdmin && (
                    <>
                        <NavLink to="/admin" className={linkClass}>
                            <HiOutlineChartBar className="w-5 h-5" />
                            Admin Panel
                        </NavLink>
                        <NavLink to="/admin/tickets" className={linkClass}>
                            <HiOutlineClipboardList className="w-5 h-5" />
                            All Tickets
                        </NavLink>
                    </>
                )}

                <div className="my-6 border-t border-civic-border opacity-50"></div>

                <NavLink to="/" className={linkClass}>
                    <HiOutlineHome className="w-5 h-5" />
                    Home Page
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
