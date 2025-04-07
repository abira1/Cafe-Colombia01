import React from 'react';

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="w-full bg-cover bg-center h-screen flex items-center" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.postimg.cc/GtHNSV1z/cover-n.jpg')"
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Cafe Colombia</h1>
        <p className="text-xl md:text-2xl mb-8">
          Experience the authentic taste of Colombian coffee
        </p>
        <a 
          href="#menu" 
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
        >
          View Our Menu
        </a>
      </div>
    </section>
  );
}