import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface ReviewFormData {
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

export function ReviewSection() {
  const { reviews, updateReviews } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    role: '',
    content: '',
    rating: 5
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Only show approved reviews
  const approvedReviews = reviews.filter(review => review.status === 'approved' && review.active);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview = {
      ...formData,
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      active: true
    };

    updateReviews([...reviews, newReview]);
    setSubmissionStatus('success');
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setShowForm(false);
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5
      });
      setSubmissionStatus('idle');
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer' : ''}`}
        onClick={interactive ? () => setFormData({ ...formData, rating: index + 1 }) : undefined}
      />
    ));
  };

  return (
    <section className="py-16 bg-[#FFFBF5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="h-1 w-24 bg-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">What our customers say about us</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Write a Review</h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: '',
                      role: '',
                      content: '',
                      rating: 5
                    });
                    setSubmissionStatus('idle');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submissionStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-green-600 text-xl mb-2">Thank you for your review!</div>
                  <p className="text-gray-600">Your review has been submitted and is pending approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="e.g., Regular Customer, Coffee Enthusiast"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Review</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="mt-1 flex items-center gap-1">
                      {renderStars(formData.rating, true)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                      />
                    </div>
                    {formData.imageUrl && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={formData.imageUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: undefined })}
                          className="text-red-600 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({
                          name: '',
                          role: '',
                          content: '',
                          rating: 5
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
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedReviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                {review.imageUrl ? (
                  <img 
                    src={review.imageUrl} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-600 text-xl font-semibold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 mb-4">{review.content}</p>

              <div className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          ))}

          {approvedReviews.length === 0 && (
            <div className="col-span-full text-center text-gray-500 p-8 bg-white rounded-lg">
              No reviews available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 