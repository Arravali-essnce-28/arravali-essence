import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useAuthStore } from '../../services/auth.service';
import { hasUserPermission } from '../../components/admin/AdminRoute';
import { 
    Loader2, 
    Eye, 
    Truck, 
    Clock, 
    Search, 
    Package, 
    User, 
    MapPin, 
    Phone, 
    Mail, 
    Calendar, 
    X,
    Send
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminOrdersPage: React.FC = () => {
    const { user: currentUser } = useAuthStore();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    // Selected order for full detail modal
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('');
    const [statusNote, setStatusNote] = useState('');

    const canUpdateOrders = hasUserPermission(currentUser, 'orders.update');

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage, statusFilter]);

    const fetchOrders = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await api.getAdminOrders(page);
            setOrders(data.data || []);
            setTotalPages(data.last_page || 1);
        } catch (error) {
            console.error('Failed to fetch orders', error);
            toast.error('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewOrder = async (orderId: number) => {
        setIsDetailLoading(true);
        try {
            const orderData = await api.getAdminOrder(orderId);
            setSelectedOrder(orderData);
            setTrackingNumber('');
            setCarrier('');
            setStatusNote('');
        } catch (error) {
            console.error('Failed to load order details', error);
            const local = orders.find(o => o.id === orderId);
            setSelectedOrder(local || null);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: number, newStatus: string, customDetails?: any) => {
        if (!canUpdateOrders) {
            toast.error('You do not have permission to update orders.');
            return;
        }

        setUpdatingId(orderId);
        try {
            const res = await api.updateOrderStatus(orderId, newStatus, customDetails);
            toast.success(`Order #${orderId} updated to ${newStatus}`);
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder(res.order || { ...selectedOrder, status: newStatus });
            }
            fetchOrders(currentPage);
        } catch (error) {
            console.error('Failed to update status', error);
            toast.error('Failed to update order status');
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'shipped':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'processing':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    const parseAddress = (shippingAddress: any) => {
        if (!shippingAddress) return {};
        if (typeof shippingAddress === 'object') return shippingAddress;
        try {
            return JSON.parse(shippingAddress);
        } catch {
            return {};
        }
    };

    const filteredOrders = orders.filter(order => {
        if (statusFilter !== 'all' && order.status !== statusFilter) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const addr = parseAddress(order.shipping_address);
            const name = (addr.name || `${addr.first_name || ''} ${addr.last_name || ''}`).toLowerCase();
            const email = (addr.email || order.user?.email || '').toLowerCase();
            const num = (order.order_number || '').toLowerCase();
            return name.includes(q) || email.includes(q) || num.includes(q);
        }
        return true;
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Order Management</h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Inspect customer purchases, tracking milestones, and fulfillments.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by order #, customer, email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
                        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors font-medium ${
                                    statusFilter === st
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5">Order</th>
                                    <th className="px-5 py-3.5">Customer</th>
                                    <th className="px-5 py-3.5">Items & Amount</th>
                                    <th className="px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                                <span>Loading orders...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => {
                                        const addr = parseAddress(order.shipping_address);
                                        const customerName = addr.name || `${addr.first_name || ''} ${addr.last_name || ''}`.trim() || order.user?.name || 'Customer';
                                        const customerEmail = addr.email || order.user?.email || 'N/A';
                                        const itemCount = Array.isArray(order.items) ? order.items.reduce((acc: number, it: any) => acc + (it.quantity || 1), 0) : '—';

                                        return (
                                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-5 py-3.5 font-medium text-slate-900">
                                                    #{order.order_number || order.id}
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    <div className="font-medium text-slate-900">{customerName}</div>
                                                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{customerEmail}</div>
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    <div className="font-semibold text-slate-900">
                                                        £{Number(order.total_amount || 0).toFixed(2)}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400">
                                                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5 text-slate-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-normal capitalize border ${getStatusBadge(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-3.5 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {canUpdateOrders && (
                                                            <div className="relative">
                                                                {updatingId === order.id ? (
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                                                                ) : (
                                                                    <select
                                                                        value={order.status}
                                                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                                        className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-slate-700 focus:outline-none"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="processing">Processing</option>
                                                                        <option value="shipped">Shipped</option>
                                                                        <option value="delivered">Delivered</option>
                                                                        <option value="cancelled">Cancelled</option>
                                                                    </select>
                                                                )}
                                                            </div>
                                                        )}
                                                        <button
                                                            onClick={() => handleViewOrder(order.id)}
                                                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
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

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col text-xs">
                            {/* Modal Header */}
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Order #{selectedOrder.order_number || selectedOrder.id}
                                    </h2>
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full border capitalize ${getStatusBadge(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                                {/* Top Overview Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                                        <p className="text-[11px] text-slate-400">Order Date</p>
                                        <p className="font-medium text-slate-800 mt-0.5">
                                            {new Date(selectedOrder.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                                        <p className="text-[11px] text-slate-400">Payment Status</p>
                                        <p className="font-medium text-slate-800 capitalize mt-0.5">
                                            {selectedOrder.payment_status || 'Paid'} ({selectedOrder.payment_method || 'Card'})
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                                        <p className="text-[11px] text-slate-400">Total Amount</p>
                                        <p className="text-sm font-semibold text-slate-900 mt-0.5">
                                            £{Number(selectedOrder.total_amount || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="border border-slate-200/80 rounded-lg overflow-hidden">
                                    <div className="px-4 py-2.5 bg-slate-50/60 border-b border-slate-200/80 font-medium text-slate-700">
                                        Order Items
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any) => (
                                            <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.product?.image || '/images/hero.jpg'}
                                                        alt={item.product?.name || item.name}
                                                        className="w-10 h-10 rounded-md object-cover bg-slate-100 border border-slate-200"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/images/hero.jpg';
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium text-slate-900">{item.product?.name || item.name}</p>
                                                        <p className="text-[11px] text-slate-400">
                                                            Qty: {item.quantity} × £{Number(item.price || 0).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-slate-900">
                                                    £{(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Customer & Shipping Info */}
                                {(() => {
                                    const addr = parseAddress(selectedOrder.shipping_address);
                                    return (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="border border-slate-200/80 rounded-lg p-3.5 space-y-2 bg-slate-50/30">
                                                <p className="font-medium text-slate-900 flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-slate-400" /> Customer Information
                                                </p>
                                                <p className="text-slate-700">{addr.name || `${addr.first_name || ''} ${addr.last_name || ''}` || selectedOrder.user?.name || 'Customer'}</p>
                                                <p className="text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3 text-slate-400" /> {addr.email || selectedOrder.user?.email || 'N/A'}
                                                </p>
                                                <p className="text-slate-500 flex items-center gap-1">
                                                    <Phone className="w-3 h-3 text-slate-400" /> {addr.phone || 'N/A'}
                                                </p>
                                            </div>

                                            <div className="border border-slate-200/80 rounded-lg p-3.5 space-y-2 bg-slate-50/30">
                                                <p className="font-medium text-slate-900 flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Delivery Address
                                                </p>
                                                <p className="text-slate-600 leading-relaxed">
                                                    {addr.address || addr.street || addr.address_line_1 || 'No address line'}<br />
                                                    {addr.city ? `${addr.city}, ` : ''}{addr.state || ''} {addr.postal_code || addr.zip || ''}<br />
                                                    {addr.country || 'United Kingdom'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminOrdersPage;
