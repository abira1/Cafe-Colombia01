import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Menu", id: "menu" },
    { name: "Events", id: "events" },
    { name: "Gallery", id: "gallery" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-amber-900 shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img 
            src="https://i.postimg.cc/wM73vqhz/391680679-233196746418298-874881169255510914-n-removebg-preview-1.png" 
            alt="Café Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-white hover:text-yellow-300 transition duration-300 text-sm uppercase tracking-wider font-medium ${
                isScrolled ? 'py-1' : 'py-2'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full transition duration-300 text-sm uppercase tracking-wider font-medium"
          >
            Reserve Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`lg:hidden fixed inset-0 bg-amber-900 z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-yellow-300 transition duration-300 text-lg font-medium text-left"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="mt-auto pb-8">
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-6 py-3 rounded-full transition duration-300 text-lg font-medium"
            >
              Reserve Now
            </button>
            <div className="mt-6 flex items-center justify-center text-white">
              <span className="text-lg">+8801971-588060</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}