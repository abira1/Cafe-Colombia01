import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import CouponInput from '../components/CouponInput';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { location, isLoading: locationLoading } = useLocation();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [freeShippingProgress, setFreeShippingProgress] = useState(0);

  const subtotal = total;
  const shipping = subtotal > 1000 ? 0 : 100;
  const finalTotal = subtotal + shipping - discountAmount;

  useEffect(() => {
    // Calculate free shipping progress
    const progress = Math.min((subtotal / 1000) * 100, 100);
    setFreeShippingProgress(progress);
  }, [subtotal]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success('Item removed from cart');
  };

  const handleApplyCoupon = async (code: string) => {
    try {
      // In a real app, this would validate with a backend
      if (code.toLowerCase() === 'save10') {
        const discount = subtotal * 0.1;
        setDiscountCode(code);
        setDiscountAmount(discount);
        toast.success('10% discount applied!');
      } else if (code.toLowerCase() === 'freeship') {
        setDiscountCode(code);
        setDiscountAmount(shipping);
        toast.success('Free shipping applied!');
      } else {
        throw new Error('Invalid coupon code');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountCode('');
    setDiscountAmount(0);
    toast.success('Coupon removed');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (!location?.isInDeliveryArea) {
      toast.error('We currently deliver only in Dhaka');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            
            {/* Location Info */}
            {location && (
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Delivery Location: {location.address}
                  </span>
                </div>
                {!location.isInDeliveryArea && (
                  <p className="mt-2 text-sm text-red-600">
                    We currently deliver only in Dhaka. You can still browse our menu.
                  </p>
                )}
              </motion.div>
            )}
            
            {/* Free Shipping Progress Bar */}
            <motion.div 
              className="bg-white p-4 rounded-lg shadow-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {freeShippingProgress >= 100 ? '🎉 Free shipping unlocked!' : 'Add more items for free shipping'}
                </span>
                <span className="text-sm text-gray-500">
                  ৳{subtotal.toFixed(2)} / ৳1000
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-yellow-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="p-6 flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="mx-4 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="mt-2 text-red-600 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              {/* Coupon Input */}
              <CouponInput 
                onApply={handleApplyCoupon}
                onRemove={handleRemoveCoupon}
                appliedCoupon={discountCode}
                discount={discountAmount}
              />

              {/* Price Breakdown */}
              <div className="space-y-4 mt-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal ({itemCount} items)</p>
                  <p>৳{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>{shipping === 0 ? 'Free' : `৳${shipping.toFixed(2)}`}</p>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <p>Discount</p>
                    <p>-৳{discountAmount.toFixed(2)}</p>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>৳{finalTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={items.length === 0 || !location?.isInDeliveryArea}
                className="mt-6 w-full bg-yellow-600 text-white py-3 px-4 rounded-md font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {items.length === 0 
                  ? 'Cart is Empty' 
                  : !location?.isInDeliveryArea 
                    ? 'Delivery Not Available' 
                    : 'Proceed to Checkout'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 