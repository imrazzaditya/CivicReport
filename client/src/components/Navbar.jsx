import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLogout, HiOutlineUser, HiOutlineShieldCheck } from 'react-icons/hi';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-30 h-[72px] bg-white/90 backdrop-blur-md border-b border-civic-border px-6 md:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group transition-transform active:scale-95">
                <HiOutlineShieldCheck className="w-8 h-8 text-civic-primary group-hover:scale-110 transition-transform" />
                <span className="text-xl font-bold text-civic-primary tracking-tight hidden sm:block">
                    CivicReport
                </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {user && (
                    <>
                        {/* User badge */}
                        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-civic-primary text-white flex items-center justify-center font-bold text-xs">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-civic-textPrimary leading-none">{user.name}</span>
                                <span className="text-[10px] font-bold text-civic-primary uppercase tracking-widest mt-1">
                                    {user.role === 'admin' ? 'ADMINISTRATOR' : 'CITIZEN USER'}
                                </span>
                            </div>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-civic-textSecondary hover:text-civic-accent hover:bg-red-50 transition-all active:scale-95"
                        >
                            <HiOutlineLogout className="w-5 h-5" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
