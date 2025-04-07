import React from 'react';
import { Coffee, Award, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-amber-50">
      {/* Background Logo Aligned Further to the Right */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `url("https://i.postimg.cc/3rcdqGTx/Whats-App-Image-2025-03-11-at-22-10-43-5b11aa91-removebg-preview.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50%',
          // Keeps the size as requested
          backgroundPosition: '95% center',
          // Adjusted for better alignment
          filter: 'blur(3px)' // Subtle blur effect
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left Side Image */}
          <div className="md:w-1/2">
            <img 
              src="https://i.postimg.cc/L5V6Cd9w/2024-12-20-1.jpg" 
              alt="Coffee plantation in Colombia" 
              className="rounded-lg shadow-xl" 
            />
          </div>

          {/* Right Side Content */}
          <div className="md:w-1/2 relative">
            <h3 className="text-2xl font-semibold mb-4">
              Welcome to Cafe Colombia
            </h3>
            <p className="mb-6 text-gray-700">
              Cafe Colombia is a new beginning to give Dhaka a place to escape
              your daily worries. Please visit for a perfect cup of coffee and
              food, and enjoy the time in our beautiful outlet with one of the
              biggest outdoor facilities.
            </p>
            <p className="mb-8 text-gray-700">
              Our extended line of Hot and Cold Coffee beverages will make your
              every visit worthy. Our international and well-experienced chef
              and his team are always ready to serve you tasty, quality, and
              hygienic food every time. We promise to make your every visit
              memorable.
            </p>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee size={28} className="text-white" />
                </div>
                <h4 className="font-semibold">Premium Beans</h4>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-white" />
                </div>
                <h4 className="font-semibold">Approachability</h4>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-white" />
                </div>
                <h4 className="font-semibold">Community Focused</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}