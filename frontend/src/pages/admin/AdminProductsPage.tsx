import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useAuthStore } from '../../services/auth.service';
import { hasUserPermission } from '../../components/admin/AdminRoute';
import { Loader2, Plus, Edit, Trash2, Search, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminProductsPage: React.FC = () => {
    const { user: currentUser } = useAuthStore();
    const canCreate = hasUserPermission(currentUser, 'products.create');
    const canEdit = hasUserPermission(currentUser, 'products.edit');
    const canDelete = hasUserPermission(currentUser, 'products.delete');

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [categories, setCategories] = useState<any[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        short_description: '',
        price: '',
        sale_price: '',
        quantity: '',
        category_id: '',
        weight: '',
        image: null as File | null,
        back_image: null as File | null,
        is_featured: false,
        is_active: true
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewBackImage, setPreviewBackImage] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts(currentPage);
        fetchCategories();
    }, [currentPage]);

    const fetchProducts = async (page: number) => {
        setIsLoading(true);
        try {
            const data = await api.getAdminProducts(page);
            setProducts(data.data);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error('Failed to fetch products', error);
            toast.error('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await api.getCategories();
            if (Array.isArray(data)) {
                setCategories(data);
            } else if (data.data) {
                setCategories(data.data); // Handle paginated response if applicable
            }
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'back_image') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, [field]: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'image') setPreviewImage(reader.result as string);
                else setPreviewBackImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                if (key === 'is_featured' || key === 'is_active') {
                    // Start Update: Change boolean handling for FormData
                    // Only append '1' if true. If false, do NOT append for 'checkbox' behavior in Laravel validation mostly checks presence or boolean.
                    // Actually, Laravel's $request->has('foo') works for checkboxes.
                    // But for API, we usually send explicit boolean or 0/1. 
                    // Let's send 1/0.
                    data.append(key, value ? '1' : '0'); 
                } else {
                    data.append(key, value as any);
                }
            }
        });

        try {
            if (editingProduct) {
                await api.updateProduct(editingProduct.id, data);
                toast.success('Product updated successfully');
            } else {
                await api.storeProduct(data);
                toast.success('Product created successfully');
            }
            setIsFormOpen(false);
            resetForm();
            fetchProducts(currentPage);
        } catch (error) {
            console.error('Failed to save product', error);
            toast.error('Failed to save product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            short_description: product.short_description || '',
            price: product.price,
            sale_price: product.sale_price || '',
            quantity: product.quantity,
            category_id: product.category_id || '',
            weight: product.weight || '',
            image: null,
            back_image: null,
            is_featured: Boolean(product.is_featured),
            is_active: Boolean(product.is_active)
        });
        setPreviewImage(product.image);
        setPreviewBackImage(product.back_image);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchProducts(currentPage);
            } catch (error) {
                console.error('Failed to delete product', error);
                toast.error('Failed to delete product');
            }
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            short_description: '',
            price: '',
            sale_price: '',
            quantity: '',
            category_id: '',
            weight: '',
            image: null,
            back_image: null,
            is_featured: false,
            is_active: true
        });
        setPreviewImage(null);
        setPreviewBackImage(null);
    };

    if (isFormOpen) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <button 
                            onClick={() => { setIsFormOpen(false); resetForm(); }}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select 
                                        name="category_id" 
                                        value={formData.category_id} 
                                        onChange={handleInputChange} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            value={formData.price} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sale Price</label>
                                        <input 
                                            type="number" 
                                            name="sale_price" 
                                            value={formData.sale_price} 
                                            onChange={handleInputChange} 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                        <input 
                                            type="number" 
                                            name="quantity" 
                                            value={formData.quantity} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                        <input 
                                            type="number" 
                                            step="0.01" 
                                            name="weight" 
                                            value={formData.weight} 
                                            onChange={handleInputChange} 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Images and Description */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Main Image</label>
                                    <div className="mt-1 flex items-center gap-4">
                                        {previewImage && (
                                            <img src={previewImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                                        )}
                                        <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <span>Upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hover Image (Optional)</label>
                                    <div className="mt-1 flex items-center gap-4">
                                        {previewBackImage && (
                                            <img src={previewBackImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                                        )}
                                        <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            <span>Upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'back_image')} />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            name="is_featured" 
                                            checked={formData.is_featured} 
                                            onChange={handleInputChange}
                                            className="rounded text-amber-600 focus:ring-amber-500" 
                                        />
                                        <span className="text-sm cursor-pointer select-none">Featured Product</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            name="is_active" 
                                            checked={formData.is_active} 
                                            onChange={handleInputChange}
                                            className="rounded text-amber-600 focus:ring-amber-500" 
                                        />
                                        <span className="text-sm cursor-pointer select-none">Active</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea 
                                name="short_description" 
                                value={formData.short_description} 
                                onChange={handleInputChange}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Description</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                required 
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 border p-2"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => { setIsFormOpen(false); resetForm(); }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Products & Inventory</h1>
                    <p className="text-xs text-slate-500 mt-0.5">Manage spices, pricing, stock levels, and media.</p>
                </div>
                {canCreate && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                    >
                        <Plus size={16} />
                        <span>Add Product</span>
                    </button>
                )}
            </div>

            {/* Product List */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3.5">Product</th>
                                <th className="px-5 py-3.5">Category</th>
                                <th className="px-5 py-3.5">Price</th>
                                <th className="px-5 py-3.5">Stock</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                className="h-9 w-9 rounded-lg object-cover bg-slate-100 border border-slate-200" 
                                                src={product.image || '/images/hero.jpg'} 
                                                alt="" 
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/images/hero.jpg';
                                                }}
                                            />
                                            <div>
                                                <div className="font-medium text-slate-900">{product.name}</div>
                                                {product.weight && (
                                                    <div className="text-[10px] text-slate-400">{product.weight}kg</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500">{product.category?.name || 'Spices'}</td>
                                    <td className="px-5 py-3.5 font-semibold text-slate-900">£{Number(product.price).toFixed(2)}</td>
                                    <td className="px-5 py-3.5 text-slate-600">{product.quantity}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2 py-0.5 inline-flex text-[11px] rounded-full border ${
                                            product.is_active 
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                : 'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right font-medium">
                                        <div className="flex justify-end gap-1">
                                            {canEdit && (
                                                <button 
                                                    onClick={() => handleEdit(product)}
                                                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                            )}
                                            {canDelete && (
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                        No products found
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

export default AdminProductsPage;
