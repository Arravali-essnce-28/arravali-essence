// src/components/ProductCard.tsx
import { Link } from 'react-router-dom';
import { Star, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Check if product is already in cart
  useEffect(() => {
    const cartItem = cart.find((item: CartItem) => item.product.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    
    // Reset added state after 2 seconds
    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
            <h3 className="font-semibold text-lg">{product.name}</h3>
          </Link>
          <span className="font-bold text-primary-600">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
          </div>
          <span className="text-sm font-medium text-primary-600">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button 
              onClick={decrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button 
              onClick={increment}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center space-x-2 ${
              isAdded 
                ? 'bg-green-600 text-white' 
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={18} className="mr-1" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-1" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;