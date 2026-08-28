import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useAuthStore } from '../../services/auth.service';
import { 
    UserCog, 
    Plus, 
    Search, 
    Trash2, 
    Edit3, 
    Shield, 
    ShieldCheck, 
    UserCheck, 
    Phone, 
    Mail, 
    Lock, 
    Check, 
    X, 
    Eye, 
    EyeOff, 
    Loader2, 
    Filter, 
    AlertTriangle,
    Users,
    KeyRound,
    Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { User, PermissionModule, RolePreset } from '../../types/auth';

interface EmployeeModalState {
    isOpen: boolean;
    mode: 'create' | 'edit';
    employeeId?: number;
    formData: {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        role: 'employee' | 'admin';
        permissions: string[];
        status: 'active' | 'inactive';
    };
}

const initialModalState: EmployeeModalState = {
    isOpen: false,
    mode: 'create',
    formData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'employee',
        permissions: ['dashboard.view', 'products.view', 'orders.view'],
        status: 'active',
    }
};

const AdminEmployeesPage: React.FC = () => {
    const { user: currentUser } = useAuthStore();
    const [employees, setEmployees] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // Permission modules and presets from backend
    const [permissionModules, setPermissionModules] = useState<PermissionModule[]>([]);
    const [rolePresets, setRolePresets] = useState<RolePreset[]>([]);

    // Modal state
    const [modal, setModal] = useState<EmployeeModalState>(initialModalState);
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const isAdmin = Boolean(currentUser?.is_admin || currentUser?.role === 'admin');

    useEffect(() => {
        fetchPermissionsMeta();
        fetchEmployees(1);
    }, [statusFilter, roleFilter]);

    const fetchPermissionsMeta = async () => {
        try {
            const data = await api.getPermissionsList();
            if (data.modules) setPermissionModules(data.modules);
            if (data.presets) setRolePresets(data.presets);
        } catch (error) {
            console.error('Failed to load permissions meta', error);
            setPermissionModules([
                {
                    group: 'Dashboard & Analytics',
                    description: 'Access overview statistics and analytics',
                    permissions: [
                        { id: 'dashboard.view', label: 'View Dashboard & Stats', description: 'View sales figures, recent orders and overview' }
                    ]
                },
                {
                    group: 'Products Management',
                    description: 'Control spice catalog and inventory',
                    permissions: [
                        { id: 'products.view', label: 'View Products List', description: 'Browse and search product catalog' },
                        { id: 'products.create', label: 'Create New Products', description: 'Add new spices with images and pricing' },
                        { id: 'products.edit', label: 'Edit Products', description: 'Modify prices, description, stock & images' },
                        { id: 'products.delete', label: 'Delete Products', description: 'Permanently remove items from store' }
                    ]
                },
                {
                    group: 'Orders & Fulfillment',
                    description: 'Manage incoming orders and shipments',
                    permissions: [
                        { id: 'orders.view', label: 'View Orders', description: 'Inspect customer orders, items and shipping details' },
                        { id: 'orders.update', label: 'Update Status & Tracking', description: 'Update status and add shipment tracking milestones' }
                    ]
                },
                {
                    group: 'Customer Accounts',
                    description: 'Manage registered store customers',
                    permissions: [
                        { id: 'users.view', label: 'View Customer Profiles', description: 'View customer accounts and purchase histories' },
                        { id: 'users.delete', label: 'Delete Customer Accounts', description: 'Remove customer profiles from the system' }
                    ]
                }
            ]);
        }
    };

    const fetchEmployees = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const params: any = { page };
            if (searchQuery.trim()) params.search = searchQuery.trim();
            if (statusFilter !== 'all') params.status = statusFilter;
            if (roleFilter !== 'all') params.role = roleFilter;

            const res = await api.getEmployees(params);
            setEmployees(res.data || []);
            setTotalPages(res.last_page || 1);
            setCurrentPage(res.current_page || 1);
            setTotalCount(res.total || 0);
        } catch (error) {
            console.error('Failed to load employees', error);
            toast.error('Failed to load staff list');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEmployees(1);
    };

    const handleOpenCreate = () => {
        setModal({
            isOpen: true,
            mode: 'create',
            formData: {
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                role: 'employee',
                permissions: ['dashboard.view', 'products.view', 'orders.view'],
                status: 'active',
            }
        });
        setShowPassword(false);
    };

    const handleOpenEdit = (emp: User) => {
        const perms = Array.isArray(emp.permissions) ? emp.permissions : [];
        setModal({
            isOpen: true,
            mode: 'edit',
            employeeId: emp.id,
            formData: {
                name: emp.name || '',
                email: emp.email || '',
                phone: emp.phone || '',
                password: '',
                confirmPassword: '',
                role: (emp.role === 'admin' || emp.is_admin) ? 'admin' : 'employee',
                permissions: perms,
                status: emp.status === 'inactive' ? 'inactive' : 'active',
            }
        });
        setShowPassword(false);
    };

    const handleCloseModal = () => {
        setModal(initialModalState);
        setShowPassword(false);
    };

    const togglePermission = (permId: string) => {
        setModal(prev => {
            const current = prev.formData.permissions;
            const updated = current.includes(permId)
                ? current.filter(p => p !== permId)
                : [...current, permId];
            return {
                ...prev,
                formData: {
                    ...prev.formData,
                    permissions: updated
                }
            };
        });
    };

    const toggleModuleAll = (module: PermissionModule) => {
        const modulePermIds = module.permissions.map(p => p.id);
        setModal(prev => {
            const current = prev.formData.permissions;
            const hasAll = modulePermIds.every(id => current.includes(id));
            const updated = hasAll
                ? current.filter(id => !modulePermIds.includes(id))
                : Array.from(new Set([...current, ...modulePermIds]));

            return {
                ...prev,
                formData: {
                    ...prev.formData,
                    permissions: updated
                }
            };
        });
    };

    const applyPreset = (preset: RolePreset) => {
        setModal(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                role: (preset.id === 'admin' ? 'admin' : 'employee') as 'admin' | 'employee',
                permissions: preset.permissions
            }
        }));
        toast.success(`Applied '${preset.name}' template`);
    };

    const handleSaveEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, phone, password, confirmPassword, role, permissions, status } = modal.formData;

        if (!name.trim()) {
            toast.error('Please enter a full name');
            return;
        }

        if (!email.trim()) {
            toast.error('Please enter an email address');
            return;
        }

        if (modal.mode === 'create') {
            if (!password) {
                toast.error('Please specify an initial password for login');
                return;
            }
            if (password.length < 6) {
                toast.error('Password must be at least 6 characters');
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
        } else {
            if (password && password.length < 6) {
                toast.error('New password must be at least 6 characters');
                return;
            }
            if (password && password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
        }

        setIsSaving(true);
        try {
            const payload: any = {
                name,
                email,
                phone: phone || null,
                role,
                permissions: role === 'admin' ? permissionModules.flatMap(m => m.permissions.map(p => p.id)) : permissions,
                status,
            };

            if (password) {
                payload.password = password;
            }

            if (modal.mode === 'create') {
                await api.createEmployee(payload);
                toast.success('Employee account created');
            } else if (modal.employeeId) {
                await api.updateEmployee(modal.employeeId, payload);
                toast.success('Employee account updated');
            }

            handleCloseModal();
            fetchEmployees(currentPage);
        } catch (error: any) {
            console.error('Failed to save employee', error);
            const msg = error.response?.data?.message || 'Failed to save employee. Check if email is unique.';
            toast.error(msg);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteEmployee = async () => {
        if (!deleteConfirmId) return;

        setIsDeleting(true);
        try {
            await api.deleteEmployee(deleteConfirmId);
            toast.success('Employee account deleted');
            setDeleteConfirmId(null);
            fetchEmployees(currentPage);
        } catch (error: any) {
            console.error('Failed to delete employee', error);
            const msg = error.response?.data?.message || 'Failed to delete employee';
            toast.error(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Staff & Access Control</h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Manage staff members, credentials, and feature permissions.
                        </p>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={handleOpenCreate}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors shadow-xs shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            Add Staff Member
                        </button>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Staff</p>
                            <p className="text-xl font-semibold text-slate-900">{totalCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Staff</p>
                            <p className="text-xl font-semibold text-slate-900">
                                {employees.filter(e => e.status !== 'inactive').length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Administrators</p>
                            <p className="text-xl font-semibold text-slate-900">
                                {employees.filter(e => e.is_admin || e.role === 'admin').length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search staff by name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                        />
                    </form>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="text-slate-400">Status:</span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none"
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="text-slate-400">Role:</span>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none"
                            >
                                <option value="all">All</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Employees Table */}
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5">Staff Member</th>
                                    <th className="px-5 py-3.5">Contact</th>
                                    <th className="px-5 py-3.5">Role & Status</th>
                                    <th className="px-5 py-3.5">Assigned Capabilities</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                                <span>Loading staff accounts...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                            No staff accounts found
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map((emp) => {
                                        const isEmpAdmin = Boolean(emp.is_admin || emp.role === 'admin');
                                        const perms = Array.isArray(emp.permissions) ? emp.permissions : [];
                                        const isSelf = emp.id === currentUser?.id;

                                        return (
                                            <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-medium text-xs shrink-0">
                                                            {emp.name ? emp.name.charAt(0).toUpperCase() : 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-900 flex items-center gap-1.5">
                                                                <span>{emp.name}</span>
                                                                {isSelf && (
                                                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">
                                                                        You
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[11px] text-slate-400">
                                                                Added {emp.created_at ? new Date(emp.created_at).toLocaleDateString() : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-1.5 text-slate-700">
                                                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                            <span>{emp.email}</span>
                                                        </div>
                                                        {emp.phone && (
                                                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                                <span>{emp.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-normal border ${
                                                            isEmpAdmin 
                                                                ? 'bg-slate-100 text-slate-800 border-slate-200' 
                                                                : 'bg-blue-50 text-blue-700 border-blue-100'
                                                        }`}>
                                                            {isEmpAdmin ? 'Admin' : 'Employee'}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-normal border ${
                                                            emp.status === 'inactive'
                                                                ? 'bg-red-50 text-red-700 border-red-100'
                                                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        }`}>
                                                            {emp.status === 'inactive' ? 'Inactive' : 'Active'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5">
                                                    {isEmpAdmin ? (
                                                        <span className="text-[11px] text-slate-500 font-normal">
                                                            All features allowed
                                                        </span>
                                                    ) : perms.length === 0 ? (
                                                        <span className="text-[11px] text-slate-400 italic">No permissions</span>
                                                    ) : (
                                                        <div className="flex flex-wrap gap-1 max-w-sm">
                                                            {perms.slice(0, 3).map((p) => (
                                                                <span
                                                                    key={p}
                                                                    className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
                                                                >
                                                                    {p}
                                                                </span>
                                                            ))}
                                                            {perms.length > 3 && (
                                                                <span className="text-[10px] text-slate-400 self-center">
                                                                    +{perms.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-5 py-3.5 text-right">
                                                    {isAdmin ? (
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => handleOpenEdit(emp)}
                                                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit3 className="w-3.5 h-3.5" />
                                                            </button>
                                                            {!isSelf && (
                                                                <button
                                                                    onClick={() => setDeleteConfirmId(emp.id)}
                                                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-[11px] text-slate-400 italic">View only</span>
                                                    )}
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
                                    onClick={() => fetchEmployees(currentPage - 1)}
                                    className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => fetchEmployees(currentPage + 1)}
                                    className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-white hover:bg-slate-50 disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Create / Edit Employee Modal */}
                {modal.isOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        {modal.mode === 'create' ? 'Create Staff Member' : 'Edit Staff Member'}
                                    </h2>
                                    <p className="text-[11px] text-slate-500">
                                        Configure login credentials and select allowed features.
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSaveEmployee} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
                                {/* Section 1: Account Information */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-semibold text-slate-900">
                                        1. Account Information
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={modal.formData.name}
                                                onChange={(e) => setModal(m => ({ ...m, formData: { ...m.formData, name: e.target.value } }))}
                                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+44 7123 456789"
                                                value={modal.formData.phone}
                                                onChange={(e) => setModal(m => ({ ...m, formData: { ...m.formData, phone: e.target.value } }))}
                                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-slate-700 mb-1 font-medium">
                                                Login Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="employee@arravaliessence.com"
                                                value={modal.formData.email}
                                                onChange={(e) => setModal(m => ({ ...m, formData: { ...m.formData, email: e.target.value } }))}
                                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">
                                                {modal.mode === 'create' ? 'Password' : 'New Password (Optional)'}
                                                {modal.mode === 'create' && <span className="text-red-500"> *</span>}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder={modal.mode === 'create' ? 'Min 6 characters' : 'Leave blank to keep current'}
                                                    value={modal.formData.password}
                                                    onChange={(e) => setModal(m => ({ ...m, formData: { ...m.formData, password: e.target.value } }))}
                                                    className="w-full pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">
                                                Confirm Password
                                            </label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Repeat password"
                                                value={modal.formData.confirmPassword}
                                                onChange={(e) => setModal(m => ({ ...m, formData: { ...m.formData, confirmPassword: e.target.value } }))}
                                                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Account Role & Status */}
                                <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <h3 className="text-xs font-semibold text-slate-900">
                                        2. Role & Account Status
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">Role Type</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setModal(m => ({ ...m, formData: { ...m.formData, role: 'employee' } }))}
                                                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                                                        modal.formData.role === 'employee'
                                                            ? 'bg-slate-900 text-white border-slate-900'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Staff Employee
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setModal(m => ({ ...m, formData: { ...m.formData, role: 'admin' } }))}
                                                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                                                        modal.formData.role === 'admin'
                                                            ? 'bg-slate-900 text-white border-slate-900'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Full Admin
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 mb-1 font-medium">Status</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setModal(m => ({ ...m, formData: { ...m.formData, status: 'active' } }))}
                                                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                                                        modal.formData.status === 'active'
                                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Active
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setModal(m => ({ ...m, formData: { ...m.formData, status: 'inactive' } }))}
                                                    className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                                                        modal.formData.status === 'inactive'
                                                            ? 'bg-red-50 text-red-800 border-red-300'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    Inactive
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Granular Permissions Matrix */}
                                {modal.formData.role === 'employee' && (
                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-semibold text-slate-900">
                                                3. Permissions & Accessible Pages
                                            </h3>
                                            <span className="text-[11px] text-slate-500">
                                                {modal.formData.permissions.length} selected
                                            </span>
                                        </div>

                                        {/* Presets */}
                                        {rolePresets.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {rolePresets.map((preset) => (
                                                    <button
                                                        key={preset.name}
                                                        type="button"
                                                        onClick={() => applyPreset(preset)}
                                                        className="text-[11px] font-normal px-2 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                                                    >
                                                        {preset.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Permission Groups */}
                                        <div className="space-y-3">
                                            {permissionModules.map((module) => {
                                                const moduleIds = module.permissions.map(p => p.id);
                                                const allChecked = moduleIds.every(id => modal.formData.permissions.includes(id));
                                                const someChecked = moduleIds.some(id => modal.formData.permissions.includes(id));

                                                return (
                                                    <div key={module.group} className="border border-slate-200/80 rounded-lg p-3 bg-slate-50/50">
                                                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 mb-2">
                                                            <div>
                                                                <span className="font-medium text-slate-900 text-xs">{module.group}</span>
                                                                <p className="text-[10px] text-slate-500">{module.description}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleModuleAll(module)}
                                                                className="text-[10px] text-slate-600 hover:text-slate-900 font-medium"
                                                            >
                                                                {allChecked ? 'Deselect All' : 'Select All'}
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {module.permissions.map((perm) => {
                                                                const isChecked = modal.formData.permissions.includes(perm.id);
                                                                return (
                                                                    <label
                                                                        key={perm.id}
                                                                        className={`flex items-start gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                                                                            isChecked
                                                                                ? 'bg-white border-slate-300 text-slate-900'
                                                                                : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:bg-white'
                                                                        }`}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isChecked}
                                                                            onChange={() => togglePermission(perm.id)}
                                                                            className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-0"
                                                                        />
                                                                        <div>
                                                                            <p className="font-medium text-[11px] leading-tight">{perm.label}</p>
                                                                            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{perm.description}</p>
                                                                        </div>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Modal Actions */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : modal.mode === 'create' ? 'Create Account' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirmId && (
                    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-5 text-center">
                            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900">Delete Staff Account</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                Are you sure? This employee will lose access to the admin portal immediately.
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteEmployee}
                                    disabled={isDeleting}
                                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs disabled:opacity-50"
                                >
                                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminEmployeesPage;
