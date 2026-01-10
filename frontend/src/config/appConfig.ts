// Dynamic Application Configuration
export const appConfig = {
  // UK Market Configuration
  market: {
    country: 'GB',
    currency: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    taxRate: 0.2, // UK VAT 20%
    phoneFormat: {
      pattern: /^[0-9]{10,11}$/,
      placeholder: '07123456789',
      example: '07123 456789'
    },
    postalCode: {
      pattern: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
      placeholder: 'SW1A 1AA',
      example: 'SW1A 1AA'
    }
  },

  // Dynamic Shipping Methods
  shipping: {
    methods: [
      {
        id: 'standard',
        name: 'Standard Shipping',
        price: 4.99,
        estimated: '3-5 business days',
        description: 'Reliable standard delivery',
        tracking: true,
        signature: false
      },
      {
        id: 'express',
        name: 'Express Shipping',
        price: 9.99,
        estimated: '1-2 business days',
        description: 'Fast track delivery',
        tracking: true,
        signature: false
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        price: 19.99,
        estimated: 'Next business day',
        description: 'Guaranteed next day',
        tracking: true,
        signature: true
      },
      {
        id: 'weekend',
        name: 'Weekend Delivery',
        price: 24.99,
        estimated: 'Saturday/Sunday',
        description: 'Weekend delivery available',
        tracking: true,
        signature: true
      },
      {
        id: 'international',
        name: 'International Shipping',
        price: 39.99,
        estimated: '7-14 business days',
        description: 'Worldwide delivery',
        tracking: true,
        signature: true
      }
    ],
    freeShippingThreshold: 50 // Free shipping over £50
  },

  // Dynamic Payment Methods
  payment: {
    methods: [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: 'CreditCard',
        fee: 0,
        description: 'Visa, Mastercard, Amex',
        enabled: true,
        popular: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        icon: 'CreditCard',
        fee: 0,
        description: 'Fast, secure payment',
        enabled: true,
        popular: true
      },
      {
        id: 'klarna',
        name: 'Klarna',
        icon: 'CreditCard',
        fee: 2.99,
        description: 'Buy now, pay later',
        enabled: true,
        popular: false
      },
      {
        id: 'applepay',
        name: 'Apple Pay',
        icon: 'CreditCard',
        fee: 0,
        description: 'Pay with Touch ID',
        enabled: true,
        popular: false
      },
      {
        id: 'googlepay',
        name: 'Google Pay',
        icon: 'CreditCard',
        fee: 0,
        description: 'Pay with Google',
        enabled: true,
        popular: false
      },
      {
        id: 'banktransfer',
        name: 'Bank Transfer',
        icon: 'CreditCard',
        fee: 0,
        description: 'Direct bank transfer',
        enabled: false,
        popular: false
      }
    ]
  },

  // Dynamic Categories
  categories: [
    {
      id: 'whole-spices',
      name: 'Whole Spices',
      slug: 'whole-spices',
      description: 'Premium whole spices',
      color: 'from-amber-500 to-orange-600',
      icon: '🌾',
      featured: true,
      sortOrder: 1
    },
    {
      id: 'ground-spices',
      name: 'Ground Spices',
      slug: 'ground-spices',
      description: 'Finely ground spices',
      color: 'from-red-500 to-pink-600',
      icon: '🌶️',
      featured: true,
      sortOrder: 2
    },
    {
      id: 'spice-blends',
      name: 'Spice Blends',
      slug: 'spice-blends',
      description: 'Traditional spice blends',
      color: 'from-green-500 to-teal-600',
      icon: '🎨',
      featured: true,
      sortOrder: 3
    },
    {
      id: 'herbs',
      name: 'Herbs',
      slug: 'herbs',
      description: 'Fresh and dried herbs',
      color: 'from-purple-500 to-indigo-600',
      icon: '🌿',
      featured: true,
      sortOrder: 4
    },
    {
      id: 'premium-collection',
      name: 'Premium Collection',
      slug: 'premium-collection',
      description: 'Luxury spice collection',
      color: 'from-yellow-500 to-amber-600',
      icon: '⭐',
      featured: true,
      sortOrder: 5
    }
  ],

  // Dynamic Product Badges
  badges: {
    new: {
      name: 'New',
      color: 'bg-green-500',
      textColor: 'text-white',
      condition: (product: any) => product.isNew
    },
    organic: {
      name: 'Organic',
      color: 'bg-emerald-500',
      textColor: 'text-white',
      condition: (product: any) => product.isOrganic
    },
    premium: {
      name: 'Premium',
      color: 'bg-amber-500',
      textColor: 'text-white',
      condition: (product: any) => product.isPremium
    },
    sale: {
      name: 'Sale',
      color: 'bg-red-500',
      textColor: 'text-white',
      condition: (product: any) => product.hasDiscount
    },
    bestseller: {
      name: 'Bestseller',
      color: 'bg-purple-500',
      textColor: 'text-white',
      condition: (product: any) => product.isBestseller
    },
    limited: {
      name: 'Limited',
      color: 'bg-orange-500',
      textColor: 'text-white',
      condition: (product: any) => product.quantity < 10
    }
  },

  // Dynamic UI Settings
  ui: {
    theme: {
      primary: 'amber',
      secondary: 'orange',
      accent: 'red'
    },
    layout: {
      productsPerRow: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        large: 4
      },
      itemsPerPage: 12,
      enableInfiniteScroll: false,
      enableFilters: true,
      enableSearch: true,
      enableSorting: true
    },
    animations: {
      enable: true,
      duration: 0.3,
      easing: 'ease-in-out'
    }
  },

  // Dynamic Business Settings
  business: {
    name: 'Arravali Essence',
    tagline: 'Premium Authentic Indian Spices',
    description: 'Discover the finest selection of authentic Indian spices, herbs, and spice blends',
    contact: {
      email: 'info@arravaliessence.co.uk',
      phone: '+44 20 7123 4567',
      address: '123 Spice Street, London, SW1A 1AA, United Kingdom'
    },
    social: {
      facebook: 'https://facebook.com/arravaliessence',
      instagram: 'https://instagram.com/arravaliessence',
      twitter: 'https://twitter.com/arravaliessence',
      linkedin: 'https://linkedin.com/company/arravaliessence'
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  },

  // Dynamic SEO Settings
  seo: {
    title: 'Arravali Essence - Premium Authentic Indian Spices & Herbs',
    description: 'Discover the finest selection of authentic Indian spices, herbs, and spice blends. From premium saffron to traditional garam masala, experience the true flavors of India.',
    keywords: 'indian spices, authentic spices, premium spices, saffron, cardamom, turmeric, garam masala, biryani masala, online spices store, uk spices',
    author: 'Arravali Essence',
    url: 'https://arravaliessence.co.uk',
    image: '/og-image.jpg'
  }
};

// Dynamic Utility Functions
export const formatCurrency = (amount: number, currency: string = appConfig.market.currency) => {
  return new Intl.NumberFormat(appConfig.market.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  return phone;
};

export const validatePostalCode = (postalCode: string) => {
  return appConfig.market.postalCode.pattern.test(postalCode);
};

export const calculateTax = (amount: number, rate: number = appConfig.market.taxRate) => {
  return amount * rate;
};

export const calculateShipping = (subtotal: number) => {
  return subtotal >= appConfig.shipping.freeShippingThreshold ? 0 : appConfig.shipping.methods[0].price;
};

export const getPaymentFee = (paymentMethodId: string) => {
  const method = appConfig.payment.methods.find(m => m.id === paymentMethodId);
  return method ? method.fee : 0;
};

export const getOrderTotal = (subtotal: number, shippingCost: number, paymentMethodId: string) => {
  const tax = calculateTax(subtotal);
  const paymentFee = getPaymentFee(paymentMethodId);
  return subtotal + shippingCost + tax + paymentFee;
};

export default appConfig;
