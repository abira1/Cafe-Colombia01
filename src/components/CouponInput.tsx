import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CouponInputProps {
  onApply: (code: string) => Promise<void>;
  onRemove: () => void;
  appliedCoupon?: string;
  discount?: number;
}

export default function CouponInput({
  onApply,
  onRemove,
  appliedCoupon,
  discount
}: CouponInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onApply(code.trim());
      setCode('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply coupon');
    } finally {
      setIsLoading(false);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-800">
              Coupon applied: {appliedCoupon}
            </p>
            {discount && (
              <p className="text-sm text-green-600">
                You save ৳{discount.toFixed(2)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-green-600 hover:text-green-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleApplyCoupon} className="mt-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label htmlFor="coupon-code" className="sr-only">
            Coupon code
          </label>
          <input
            type="text"
            id="coupon-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            placeholder="Enter coupon code"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Applying...' : 'Apply'}
        </motion.button>
      </div>
    </form>
  );
} 