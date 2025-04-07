import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TruckIcon } from '@heroicons/react/24/outline';

interface DeliveryCountdownProps {
  orderTime: Date;
}

export default function DeliveryCountdown({ orderTime }: DeliveryCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = orderTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Delivered');
        setProgress(100);
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let timeString = '';
      if (hours > 0) {
        timeString += `${hours}h `;
      }
      if (remainingMinutes > 0 || hours === 0) {
        timeString += `${remainingMinutes}m`;
      }

      setTimeRemaining(timeString);

      // Calculate progress (assuming 45 minutes is the maximum delivery time)
      const maxDeliveryTime = 45 * 60 * 1000; // 45 minutes in milliseconds
      const progressValue = Math.min(100, ((maxDeliveryTime - diff) / maxDeliveryTime) * 100);
      setProgress(progressValue);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [orderTime]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TruckIcon className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-medium text-gray-900">Estimated Delivery</h3>
        </div>
        <span className="text-2xl font-bold text-yellow-600">{timeRemaining}</span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-yellow-600">
              Order Placed
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-yellow-600">
              Delivered
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-600"
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Your order is being prepared and will be delivered shortly.</p>
        <p className="mt-1">Thank you for choosing our service!</p>
        <p className="mt-1">Delivery fee: ৳100</p>
      </div>
    </div>
  );
} 