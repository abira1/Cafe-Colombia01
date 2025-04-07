import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
export function Footer() {
  return <footer className="bg-amber-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold">Cafe Colombia</h2>
            <p className="mt-3 text-amber-200">
              Join us for heartwarming sips and cozy moments. Experience the
              best Colombian flavors in every cup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="flex items-center gap-2 text-amber-200">
              <MapPin size={18} /> 3rd floor, Suvastu Space Rahman Galleria, 46 Gulshan Ave, Dhaka 1212
            </p>
            <p className="flex items-center gap-2 text-amber-200 mt-2">
              <Phone size={18} /> +8801971-588060
            </p>
            <p className="flex items-center gap-2 text-amber-200 mt-2">
              <Mail size={18} /> contact@cafecolombia.com
            </p>
          </div>
        </div>

        <hr className="border-amber-800 my-8" />

        {/* Socials & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a 
              href="https://www.facebook.com/cafecolombiabd/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/cafecolombiabd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-64 rounded-lg text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-amber-200 mt-8">
          <p>&copy; {new Date().getFullYear()} Café Colombia. All rights reserved.</p>
          <p className="mt-2">
            Developed by{' '}
            <a 
              href="https://www.facebook.com/toiral" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-yellow-400 transition"
            >
              Toiral Web Development
            </a>
          </p>
        </div>
      </div>
    </footer>;
}