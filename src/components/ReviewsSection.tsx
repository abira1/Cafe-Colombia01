import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { useData } from '../context/DataContext';

export function ReviewsSection() {
  const { reviews, updateReviews } = useData();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');

  const generateProfilePic = (name: string) => {
    const gender = name.endsWith('a') || name.endsWith('e') ? 'female' : 'male';
    return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(name)}&gender=${gender}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      alert('Please fill in all fields and provide a rating!');
      return;
    }

    const newReview = {
      id: crypto.randomUUID(),
      name,
      rating,
      comment: review,
      date: new Date().toISOString(),
      status: 'pending',
      helpful: 0,
      flagged: false,
      profilePic: generateProfilePic(name)
    };

    updateReviews([newReview, ...reviews]);
    setName('');
    setRating(0);
    setReview('');
    alert('Thank you for your review! It will be visible after approval.');
  };

  // Filter to show only approved reviews
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Customer Reviews
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {approvedReviews.slice(0, 4).map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img src={review.profilePic} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Leave a Review
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                rows={4}
                required
                placeholder="Write your review here..."
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 w-full"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}