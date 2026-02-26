import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Loader2, ArrowLeft, Mail, Calendar, User as UserIcon } from 'lucide-react';

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
                <div className="flex items-center justify-center h-full min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
                </div>
            </AdminLayout>
        );
    }

    if (!user) {
        return (
            <AdminLayout>
                <div className="text-center py-12">
                    <p className="text-gray-500">User not found</p>
                    <Link to="/admin/users" className="text-amber-600 hover:text-amber-700 mt-4 inline-block">
                        Back to Users
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link to="/admin/users" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
                    <ArrowLeft size={20} />
                    <span>Back to Users</span>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-3xl font-bold mb-4">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                user.is_admin ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                            }`}>
                                {user.is_admin ? 'Administrator' : 'Customer'}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail size={18} />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar size={18} />
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {user.orders && user.orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{order.order_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${Number(order.total_amount).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!user.orders || user.orders.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                No orders found for this user
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
