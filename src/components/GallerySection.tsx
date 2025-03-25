import React from 'react';
export function GallerySection() {
  const images = [{
    url: 'https://i.postimg.cc/L5V6Cd9w/2024-12-20-1.jpg',
    alt: 'Coffee beans being roasted'
  }, {
    url: 'https://i.postimg.cc/G2wLb396/unnamed-3.jpg',
    alt: 'Café interior with customers enjoying coffee'
  }, {
    url: 'https://i.postimg.cc/q7CBf6B8/unnamed-2.jpg',
    alt: 'Barista preparing coffee'
  }, {
    url: 'https://i.postimg.cc/XqWYkNb9/2024-11-23.jpg',
    alt: 'Colombian coffee farm'
  }, {
    url: 'https://i.postimg.cc/SsCK92wy/2024-06-22.jpg',
    alt: 'Latte art'
  }, {
    url: 'https://i.postimg.cc/Bvd6tc7Y/2024-02-11.jpg',
    alt: 'Coffee and pastries'
  }];
  return <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Experience the warmth and flavor of Café Colombia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={image.url} alt={image.alt} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
            </div>)}
        </div>
      </div>
    </section>;
}