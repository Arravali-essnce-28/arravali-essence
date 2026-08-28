import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../services/auth.service';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    Package, 
    UserCog, 
    LogOut, 
    ExternalLink, 
    Menu, 
    X,
    Shield,
    UserCheck,
    Store
} from 'lucide-react';
import toast from 'react-hot-toast';
import AdminPWAInstallBanner from './AdminPWAInstallBanner';
import { hasUserPermission } from './AdminRoute';

export interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    permission?: string;
    adminOnly?: boolean;
}

export const navigationItems: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag, permission: 'orders.view' },
    { name: 'Products', href: '/admin/products', icon: Package, permission: 'products.view' },
    { name: 'Customers', href: '/admin/users', icon: Users, permission: 'users.view' },
    { name: 'Employees & Access', href: '/admin/employees', icon: UserCog, permission: 'employees.manage', adminOnly: true },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Signed out');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to log out');
        }
    };

    const isAdmin = Boolean(user?.is_admin || user?.role === 'admin');

    const accessibleNav = navigationItems.filter(item => {
        if (item.adminOnly && !isAdmin) return false;
        if (item.permission && !hasUserPermission(user, item.permission)) return false;
        return true;
    });

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 text-slate-600">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
                <Link to="/admin/dashboard" className="flex items-center gap-2 text-slate-900 font-semibold text-sm tracking-tight">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                        <Store className="w-3.5 h-3.5" />
                    </div>
                    <span>Arravali Essence <span className="text-slate-400 font-normal text-xs">Admin</span></span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-50"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Profile Info */}
            <div className="p-3 mx-3 mt-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-xs shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'Staff User'}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                            {isAdmin ? 'Administrator' : 'Staff Member'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <div className="px-2 pb-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Menu
                </div>
                {accessibleNav.map((item) => {
                    const isActive = location.pathname === item.href || (item.href !== '/admin/dashboard' && location.pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                                flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors
                                ${isActive
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }
                            `}
                        >
                            <div className="flex items-center gap-2.5">
                                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{item.name}</span>
                            </div>
                            {item.adminOnly && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                                    Admin
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-slate-100 space-y-1">
                <Link
                    to="/"
                    target="_blank"
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-slate-400" />
                        View Live Store
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/60 rounded-lg transition-colors gap-2"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/70 flex flex-col font-normal text-slate-800 antialiased">
            {/* Mobile Topbar */}
            <div className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40">
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <Link to="/admin/dashboard" className="font-semibold text-sm text-slate-900">
                        Arravali Essence <span className="text-slate-400 font-normal text-xs">Admin</span>
                    </Link>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-medium">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div 
                        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="relative w-64 max-w-[80vw] h-full shadow-lg z-10">
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-60 fixed inset-y-0 left-0 z-30">
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-60 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
                    {children}
                </div>
            </main>

            <AdminPWAInstallBanner />
        </div>
    );
};

export default AdminLayout;
