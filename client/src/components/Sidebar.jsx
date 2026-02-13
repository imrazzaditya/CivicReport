import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiOutlineViewGrid,
    HiOutlinePlusCircle,
    HiOutlineClipboardList,
    HiOutlineChartBar,
    HiOutlineHome,
} from 'react-icons/hi';

/**
 * Sidebar — dashboard side navigation.
 * Shows different links based on user role.
 */
const Sidebar = () => {
    const { isAdmin } = useAuth();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-primary-50 text-primary-700 shadow-sm'
            : 'text-surface-500 hover:bg-surface-100 hover:text-surface-700'
        }`;

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-200 p-4 min-h-[calc(100vh-4rem)]">
            <div className="space-y-1">
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

                <hr className="my-3 border-surface-200" />

                <NavLink to="/" className={linkClass}>
                    <HiOutlineHome className="w-5 h-5" />
                    Home
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
