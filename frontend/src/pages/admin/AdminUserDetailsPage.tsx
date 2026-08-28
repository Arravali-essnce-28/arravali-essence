import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Loader2, ArrowLeft, Mail, Calendar } from 'lucide-react';

const AdminUserDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchUserDetails(parseInt(id));
        }
    }, [id]);

    const fetchUserDetails = async (userId: number) => {
        try {
            const data = await api.getUserDetails(userId);
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user details', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
            </AdminLayout>
        );
    }

    if (!user) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-xs text-slate-500">Customer profile not found</p>
                    <Link to="/admin/users" className="text-xs text-slate-900 font-medium mt-3 inline-block underline">
                        Back to Customers
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-5">
                <Link to="/admin/users" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-3">
                    <ArrowLeft size={14} />
                    <span>Back to Customers</span>
                </Link>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Customer Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
                        <div className="flex flex-col items-center mb-5">
                            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xl font-medium mb-3">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <h2 className="text-sm font-semibold text-slate-900">{user.name}</h2>
                            <span className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-normal border ${
                                user.is_admin ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            }`}>
                                {user.is_admin ? 'Administrator' : 'Customer'}
                            </span>
                        </div>

                        <div className="space-y-3 text-xs pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2.5 text-slate-600">
                                <Mail size={15} className="text-slate-400" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-slate-600">
                                <Calendar size={15} className="text-slate-400" />
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-slate-100">
                            <h2 className="text-xs font-semibold text-slate-900">Purchase History</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3">Order ID</th>
                                        <th className="px-5 py-3">Date</th>
                                        <th className="px-5 py-3">Total</th>
                                        <th className="px-5 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {user.orders && user.orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-slate-900">
                                                #{order.order_number || order.id}
                                            </td>
                                            <td className="px-5 py-3 text-slate-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-3 font-semibold text-slate-900">
                                                £{Number(order.total_amount || 0).toFixed(2)}
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className={`px-2 py-0.5 inline-flex text-[11px] rounded-full border capitalize ${
                                                    order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                                    order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 
                                                    'bg-amber-50 text-amber-700 border-amber-100'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!user.orders || user.orders.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                                                No orders placed yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUserDetailsPage;
