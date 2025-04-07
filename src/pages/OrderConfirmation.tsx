import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, TruckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderDetails {
  orderId: string;
  items: OrderItem[];
  total: number;
  estimatedDelivery: string;
  shippingAddress: string;
}

export default function OrderConfirmation() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderId: 'ORD-123456',
    items: [
      {
        id: '1',
        name: 'Product 1',
        quantity: 2,
        price: 29.99,
        image: '/product1.jpg',
      },
      // Add more items as needed
    ],
    total: 59.98,
    estimatedDelivery: 'March 15, 2024',
    shippingAddress: '123 Main St, City, Country',
  });

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const handleDownloadInvoice = () => {
    // Add invoice download logic
    console.log('Downloading invoice...');
  };

  const handleTrackOrder = () => {
    // Add order tracking logic
    console.log('Tracking order...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your order has been successfully placed
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
            <span className="text-sm text-gray-500">Order #{orderDetails.orderId}</span>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Items</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <p>Total</p>
              <p className="font-medium text-gray-900">${orderDetails.total.toFixed(2)}</p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <TruckIcon className="h-5 w-5 mr-2" />
              <p>Estimated delivery: {orderDetails.estimatedDelivery}</p>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>Shipping to: {orderDetails.shippingAddress}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={handleDownloadInvoice}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Download Invoice
          </button>
          <button
            onClick={handleTrackOrder}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TruckIcon className="h-5 w-5 mr-2" />
            Track Order
          </button>
        </motion.div>
      </div>
    </div>
  );
} 