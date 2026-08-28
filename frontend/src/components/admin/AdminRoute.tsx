import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../../services/auth.service';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  adminOnly?: boolean;
}

export const hasUserPermission = (user: any, permission?: string): boolean => {
  if (!user) return false;
  if (user.is_admin || user.role === 'admin') return true;
  if (!permission) return true;
  if (!Array.isArray(user.permissions)) return false;
  return user.permissions.includes(permission) || user.permissions.includes('*');
};

const AdminRoute: React.FC<AdminRouteProps> = ({ children, requiredPermission, adminOnly = false }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Deactivated account check
  if (user.status === 'inactive') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Deactivated</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Your staff account has been deactivated. Please contact your system administrator.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  const isAdmin = Boolean(user.is_admin || user.role === 'admin');
  const isEmployee = user.role === 'employee' || (Array.isArray(user.permissions) && user.permissions.length > 0);

  // Must be at least admin or employee
  if (!isAdmin && !isEmployee) {
    return <Navigate to="/" replace />;
  }

  // Admin-only guard (e.g. Employee management)
  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator Access Required</h2>
          <p className="text-gray-600 mb-6 text-sm">
            This section is restricted to system administrators. Staff employees cannot manage employee records.
          </p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Specific granular permission check
  if (requiredPermission && !hasUserPermission(user, requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Your account does not have permission to access the feature <span className="font-semibold text-gray-800">"{requiredPermission}"</span>.
          </p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
