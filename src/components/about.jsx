import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          About Us
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-center mb-8 text-amber-700 italic">
          Welcome to Sweet Treats Cake Shop!
        </h2>

        {/* Introduction Paragraph */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          At Sweet Treats, we believe that every celebration deserves a delicious cake. Our journey began with a passion for baking and a love for creating beautiful desserts that bring joy to every occasion. From birthdays to weddings, we are dedicated to crafting exquisite cakes that not only look amazing but taste divine.
        </p>

        {/* Our Mission Section */}
        <h3 className="text-xl font-bold mb-4 text-amber-700">
          Our Mission
        </h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our mission is to provide our customers with the finest quality cakes made from the freshest ingredients. We strive to create memorable experiences through our custom cake designs and exceptional customer service.
        </p>

        {/* Why Choose Us Section */}
        <h3 className="text-xl font-bold mb-4 text-amber-700">
          Why Choose Us?
        </h3>
        <ul className="text-gray-700 mb-6 space-y-2 leading-relaxed">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Handcrafted Quality:</strong> Each cake is lovingly handcrafted with attention to detail.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Custom Designs:</strong> We work with you to create a cake that reflects your unique style and theme.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Fresh Ingredients:</strong> We use only the highest quality ingredients to ensure the best taste.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Customer Satisfaction:</strong> Your happiness is our top priority!</span>
          </li>
        </ul>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-bold mb-2">
            Join Us for a Sweet Experience!
          </h4>
          <p className="text-gray-600">
            Visit us or contact us for custom orders. We can't wait to bake for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;