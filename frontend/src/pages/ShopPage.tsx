// frontend/src/pages/ShopPage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Filter, Grid, List } from 'lucide-react';
import { getProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import type { Product } from '../types';

const categories = ['All', 'Whole Spices', 'Ground Spices', 'Spice Blends', 'Organic'];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const category = searchParams.get('category') || 'All';
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = category === 'All' 
    ? products 
    : products.filter((product: Product) => 
        product.category?.toLowerCase() === category.toLowerCase()
      );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Spice Collection</h1>
          <p className="text-xl text-primary-100">Discover authentic flavors from around the world</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      category === cat
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewMode }: { product: Product; viewMode: string }) => {
  const { addToCart } = useCart();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex gap-4">
        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
        <div className="flex-1">
          <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
            {product.name}
          </Link>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <div className="flex items-center mt-2">
            <div className="flex text-primary-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < product.rating ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-primary-600">${product.price}</div>
          <Button size="sm" onClick={() => addToCart(product, 1)} className="mt-2">
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
          {product.name}
        </Link>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex text-primary-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < product.rating ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <div className="text-xl font-bold text-primary-600">${product.price}</div>
        </div>
        <Button size="sm" onClick={() => addToCart(product, 1)} className="w-full mt-3">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ShopPage;