import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useAuthStore } from '../../services/auth.service';
import { hasUserPermission } from '../../components/admin/AdminRoute';
import { Loader2, Trash2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminUsersPage: React.FC = () => {
    const { user: currentUser } = useAuthStore();
    const canDelete = hasUserPermission(currentUser, 'users.delete');

    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await api.getUsers(page);
            setUsers(data.data || []);
            setTotalPages(data.last_page || 1);
        } catch (error) {
            console.error('Failed to fetch users', error);
            toast.error('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!canDelete) {
            toast.error('You do not have permission to delete customer accounts.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await api.deleteUser(id);
            toast.success('User deleted successfully');
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Failed to delete user', error);
            toast.error('Failed to delete user');
        }
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Customer Accounts</h1>
                <p className="text-xs text-slate-500 mt-0.5">View customer registrations, activity, and purchase history.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3.5">Customer</th>
                                <th className="px-5 py-3.5">Role</th>
                                <th className="px-5 py-3.5">Joined Date</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-medium text-xs shrink-0">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                                ) : (
                                                    user.name ? user.name.charAt(0).toUpperCase() : 'U'
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900">{user.name}</div>
                                                <div className="text-[11px] text-slate-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2 py-0.5 inline-flex text-[11px] rounded-full border ${
                                            user.is_admin 
                                                ? 'bg-slate-100 text-slate-800 border-slate-200' 
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                        }`}>
                                            {user.is_admin ? 'Administrator' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-3.5 text-right font-medium">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                to={`/admin/users/${user.id}`}
                                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="View Profile"
                                            >
                                                <Eye size={15} />
                                            </Link>
                                            {canDelete && !user.is_admin && (
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                                <span>Loading customers...</span>
                                            </div>
                                        ) : 'No customer records found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs">
                        <span className="text-slate-500">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <button 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <button 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminUsersPage;
