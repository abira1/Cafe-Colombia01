import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Star, ThumbsUp, Flag, Check, MessageSquare } from 'lucide-react';
interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  helpful: number;
  flagged: boolean;
  image?: string;
}
export function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([{
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: "Best Colombian coffee I've ever had! The atmosphere is amazing.",
    date: '2023-09-15',
    status: 'pending',
    helpful: 12,
    flagged: false
  }]);
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review Management</h2>
      <div className="bg-white rounded-lg shadow">
        {reviews.map(review => <div key={review.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${review.status === 'approved' ? 'bg-green-100 text-green-800' : review.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-green-100 rounded" title="Approve">
                  <Check className="w-5 h-5 text-green-600" />
                </button>
                <button className="p-1 hover:bg-red-100 rounded" title="Reject">
                  <X className="w-5 h-5 text-red-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded" title="Flag">
                  <Flag className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-gray-600">{review.comment}</p>
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{review.helpful} helpful</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <button className="hover:text-yellow-600">Reply</button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}