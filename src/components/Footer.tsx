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
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="hover:text-yellow-300 transition">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <Twitter size={24} />
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
        </div>
      </div>
    </footer>;
}