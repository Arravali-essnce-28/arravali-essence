// frontend/src/pages/CheckoutPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Check, CreditCard, Package, Truck, Lock, Shield, MapPin, Mail, Phone, User, Calendar, CreditCard as CreditCardIcon, Loader2 } from 'lucide-react';
import appConfig, { formatCurrency, calculateTax, getPaymentFee, getOrderTotal } from '../config/appConfig';

// Form validation schemas
const shippingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().matches(/^[0-9]{6}$/, 'Invalid ZIP code').required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  shippingMethod: yup.string().required('Please select a shipping method')
});

const paymentSchema = yup.object().shape({
  cardNumber: yup.string().matches(/^[0-9]{16}$/, 'Invalid card number').required('Card number is required'),
  cardName: yup.string().required('Name on card is required'),
  expiryDate: yup.string().matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date').required('Expiry date is required'),
  cvv: yup.string().matches(/^[0-9]{3,4}$/, 'Invalid CVV').required('CVV is required'),
  saveCard: yup.boolean()
});

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const { register: shippingRegister, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = useForm({
    resolver: yupResolver(shippingSchema)
  });

  const { register: paymentRegister, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors } } = useForm({
    resolver: yupResolver(paymentSchema)
  });

  const [shippingMethods, setShippingMethods] = useState([
    { id: 'standard', name: 'Standard Shipping', price: 4.99, estimated: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', price: 9.99, estimated: '1-2 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 19.99, estimated: 'Next business day' },
    { id: 'weekend', name: 'Weekend Delivery', price: 24.99, estimated: 'Saturday/Sunday' },
    { id: 'international', name: 'International Shipping', price: 39.99, estimated: '7-14 business days' }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', fee: 0, description: 'Visa, Mastercard, Amex' },
    { id: 'paypal', name: 'PayPal', icon: 'CreditCard', fee: 0, description: 'Fast, secure payment' },
    { id: 'klarna', name: 'Klarna', icon: 'CreditCard', fee: 2.99, description: 'Buy now, pay later' },
    { id: 'applepay', name: 'Apple Pay', icon: 'CreditCard', fee: 0, description: 'Pay with Touch ID' },
    { id: 'googlepay', name: 'Google Pay', icon: 'CreditCard', fee: 0, description: 'Pay with Google' }
  ]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [taxRate, setTaxRate] = useState(0.2); // UK VAT 20%
  const [currency, setCurrency] = useState('£');
  const [country, setCountry] = useState('GB');
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);

  const onShippingSubmit = (data: any) => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const onPaymentSubmit = async (data: any) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would process payment here
      clearCart();
      setStep(3);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const paymentFee = paymentMethods.find(m => m.id === selectedPaymentMethod)?.fee || 0;
  const orderTotal = subtotal + selectedShipping.price + tax + paymentFee;

  // Dynamic currency formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
          className="flex items-center text-amber-600 hover:text-amber-700 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          {step > 1 ? 'Back' : 'Back to Cart'}
        </button>
        
        {/* Progress Steps */}
        <div className="flex justify-between max-w-2xl mx-auto mb-12">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {step > stepNumber ? <Check size={20} /> : stepNumber}
              </div>
              <span className={`text-sm mt-2 ${
                step >= stepNumber ? 'text-amber-600 font-medium' : 'text-gray-500'
              }`}>
                {['Shipping', 'Payment', 'Confirmation'][stepNumber - 1]}
              </span>
            </div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit(onShippingSubmit)} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="firstName"
                        {...shippingRegister('firstName')}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="lastName"
                        {...shippingRegister('lastName')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.lastName.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        {...shippingRegister('email')}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.email.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="1234567890"
                        {...shippingRegister('phone')}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.phone.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        {...shippingRegister('address')}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        {...shippingRegister('city')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        {...shippingRegister('state')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.state && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="zipCode"
                        {...shippingRegister('zipCode')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {shippingErrors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.zipCode.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        {...shippingRegister('country')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    {shippingErrors.country && (
                      <p className="mt-1 text-sm text-red-600">{shippingErrors.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h3>
                  <div className="space-y-4">
                    {shippingMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedShipping(method)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedShipping.id === method.id
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={method.id}
                                {...shippingRegister('shippingMethod')}
                                value={method.id}
                                checked={selectedShipping.id === method.id}
                                onChange={() => {
                                  setSelectedShipping(method);
                                  shippingRegister('shippingMethod').onChange({ target: { value: method.id, name: 'shippingMethod' } });
                                }}
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                              />
                              <label
                                htmlFor={method.id}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {method.name}
                              </label>
                            </div>
                            <p className="ml-7 text-sm text-gray-500">
                              {method.estimated}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${method.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card number <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCardIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        {...paymentRegister('cardNumber')}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {paymentErrors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Name on card <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="cardName"
                        placeholder="John Doe"
                        {...paymentRegister('cardName')}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                      />
                    </div>
                    {paymentErrors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{paymentErrors.cardName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                        Expiry date <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="expiryDate"
                          placeholder="MM/YY"
                          {...paymentRegister('expiryDate')}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                      </div>
                      {paymentErrors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          {...paymentRegister('cvv')}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                        />
                      </div>
                      {paymentErrors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="saveCard"
                      type="checkbox"
                      {...paymentRegister('saveCard')}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                      Save card for future purchases
                    </label>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                    <Lock className="h-4 w-4 mr-2 text-amber-500" />
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your order. We've sent a confirmation email with your order details.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => navigate('/shop')}
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => navigate('/orders')}
                    className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>${selectedShipping.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <p>Total</p>
                  <p>${orderTotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <Shield className="h-5 w-5 text-amber-500 mr-2" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;