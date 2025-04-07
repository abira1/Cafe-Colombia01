import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { LocationService } from '../services/LocationService';
import toast from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryNotes: string;
  paymentMethod: 'cash' | 'card';
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total: subtotal, itemCount } = useCart();
  const { location, isLoading: locationLoading } = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
    paymentMethod: 'cash'
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<number>(30);

  const shipping = subtotal > 100 ? 0 : 10;
  const finalTotal = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    if (!location?.isInDeliveryArea) {
      toast.error('We currently deliver only in Dhaka');
      navigate('/cart');
      return;
    }

    // Calculate estimated delivery time
    const locationService = LocationService.getInstance();
    setEstimatedDeliveryTime(locationService.calculateDeliveryTime());
  }, [items, location, navigate]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total: finalTotal,
        customer: formData,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        estimatedDelivery: new Date(Date.now() + estimatedDeliveryTime * 60000).toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Save order to localStorage
      const savedOrders = localStorage.getItem('orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart and navigate to confirmation
      navigate('/order-confirmation', { state: { order } });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Cart Review', 'Shipping', 'Payment', 'Confirm'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    index <= currentStep ? 'bg-yellow-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium text-white">{index + 1}</span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 w-24 ${
                      index < currentStep ? 'bg-yellow-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {['Cart Review', 'Shipping', 'Payment', 'Confirm'].map((step) => (
              <span key={step} className="text-xs font-medium text-gray-500">
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Location Info */}
        {location && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Delivery Location: {location.address}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Estimated delivery time: {estimatedDeliveryTime} minutes</span>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <p>Subtotal ({itemCount} items)</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <p>Shipping</p>
              <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
              <p>Total</p>
              <p>${finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    formErrors.firstName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                  }`}
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    formErrors.lastName
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                  }`}
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  formErrors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  formErrors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  formErrors.address
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                }`}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    formErrors.city
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                  }`}
                />
                {formErrors.city && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    formErrors.postalCode
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500'
                  }`}
                />
                {formErrors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.postalCode}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700">
                Delivery Notes (Optional)
              </label>
              <textarea
                id="deliveryNotes"
                name="deliveryNotes"
                rows={3}
                value={formData.deliveryNotes}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                placeholder="Any special instructions for delivery?"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <label htmlFor="cash" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Cash on Delivery
                </span>
                <span className="block text-sm text-gray-500">
                  Pay when you receive your order
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="card"
                name="paymentMethod"
                type="radio"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <label htmlFor="card" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">
                  Credit/Debit Card
                </span>
                <span className="block text-sm text-gray-500">
                  Pay securely with your card
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 