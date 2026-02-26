import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Loader2, Plus, Edit, Trash2, Search, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminProductsPage: React.FC = () => {
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleEdit(product)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        {isLoading ? 'Loading...' : 'No products found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminProductsPage;
