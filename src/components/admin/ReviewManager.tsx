import React, { useState } from 'react';
import { Pencil, Trash2, Star, X, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  active: boolean;
}

export function ReviewManager() {
  const { reviews, updateReviews } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewData, setReviewData] = useState<Review>({
    id: '',
    name: '',
    role: '',
    content: '',
    rating: 5,
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    active: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReview) {
      // Update existing review
      const updatedReviews = reviews.map(review =>
        review.id === editingReview.id ? reviewData : review
      );
      updateReviews(updatedReviews);
    } else {
      // Add new review
      const newReview = {
        ...reviewData,
        id: uuidv4()
      };
      updateReviews([...reviews, newReview]);
    }
    
    setShowForm(false);
    setEditingReview(null);
    setReviewData({
      id: '',
      name: '',
      role: '',
      content: '',
      rating: 5,
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      active: true
    });
  };

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      updateReviews(updatedReviews);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setReviewData(review);
    setShowForm(true);
  };

  const handleApprove = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, status: 'approved', active: true } : review
    );
    updateReviews(updatedReviews);
  };

  const handleReject = (reviewId: string) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId ? { ...review, status: 'rejected', active: false } : review
    );
    updateReviews(updatedReviews);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewData({ ...reviewData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Group reviews by status
  const pendingReviews = reviews.filter(review => review.status === 'pending');
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  const rejectedReviews = reviews.filter(review => review.status === 'rejected');

  // Combine reviews in order: pending first, then approved, then rejected
  const sortedReviews = [...pendingReviews, ...approvedReviews, ...rejectedReviews];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Review Management</h2>
        <button
          onClick={() => {
            setEditingReview(null);
            setReviewData({
              id: '',
              name: '',
              role: '',
              content: '',
              rating: 5,
              imageUrl: '',
              date: new Date().toISOString().split('T')[0],
              status: 'pending',
              active: true
            });
            setShowForm(true);
          }}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Add New Review
        </button>
      </div>

      {/* Review counts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-800 font-semibold">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingReviews.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-semibold">Approved</div>
          <div className="text-2xl font-bold text-green-600">{approvedReviews.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-800 font-semibold">Rejected</div>
          <div className="text-2xl font-bold text-red-600">{rejectedReviews.length}</div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingReview(null);
                  setReviewData({
                    id: '',
                    name: '',
                    role: '',
                    content: '',
                    rating: 5,
                    imageUrl: '',
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending',
                    active: true
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={reviewData.name}
                  onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={reviewData.role}
                  onChange={(e) => setReviewData({ ...reviewData, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="e.g., Regular Customer, Coffee Enthusiast"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Review</label>
                <textarea
                  value={reviewData.content}
                  onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= reviewData.rating
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                </div>
                {reviewData.imageUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={reviewData.imageUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, imageUrl: '' })}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Review Date</label>
                <input
                  type="date"
                  value={reviewData.date}
                  onChange={(e) => setReviewData({ ...reviewData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={reviewData.active}
                  onChange={(e) => setReviewData({ ...reviewData, active: e.target.checked })}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Active</label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingReview(null);
                    setReviewData({
                      id: '',
                      name: '',
                      role: '',
                      content: '',
                      rating: 5,
                      imageUrl: '',
                      date: new Date().toISOString().split('T')[0],
                      status: 'pending',
                      active: true
                    });
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {reviews.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No reviews found.</div>
        ) : (
          sortedReviews.map(review => (
            <div key={review.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {review.imageUrl && (
                      <img src={review.imageUrl} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <span className="font-medium">{review.name}</span>
                      <div className="text-sm text-gray-500">{review.role}</div>
                    </div>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(review.status)}`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{review.content}</p>
                    <p className="mt-1 text-gray-500">
                      Date: {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="p-1 hover:bg-green-100 rounded"
                        title="Approve"
                      >
                        <Check className="w-5 h-5 text-green-600" />
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        className="p-1 hover:bg-red-100 rounded"
                        title="Reject"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleEdit(review)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}