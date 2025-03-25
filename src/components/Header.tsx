import React, { useState } from 'react';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-amber-900 bg-opacity-95 text-white fixed w-full z-10 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="https://i.postimg.cc/wM73vqhz/391680679-233196746418298-874881169255510914-n-removebg-preview-1.png" alt="Café Logo" className="h-12 w-auto" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {["Home", "About", "Menu", "Gallery", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow-300 transition duration-300">
              {item}
            </a>)}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <nav className="md:hidden bg-amber-800 pb-4 px-6">
          <div className="flex flex-col space-y-3 text-lg font-medium">
            {["Home", "About", "Menu", "Gallery", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow-300 transition duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>)}
          </div>
        </nav>}
    </header>;
}