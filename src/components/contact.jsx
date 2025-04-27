import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4 uppercase">
          Contact Us
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Have a question or a special request? We'd love to hear from you!
        </p>

        {/* Contact Information Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Phone Number */}
            <div className="flex items-center">
              <Phone className="text-teal-500 mr-2" size={20} />
              <span className="font-medium">+254 7########</span>
            </div>

            {/* Email Address */}
            <div className="flex items-center">
              <Mail className="text-teal-500 mr-2" size={20} />
              <span className="font-medium">info@pinkiescupcakes.com</span>
            </div>

            {/* Physical Address */}
            <div className="flex items-center">
              <MapPin className="text-teal-500 mr-2" size={20} />
              <span className="font-medium">
                123 Cake Street, Bakerstown, Nairobi 90001
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
            Send Us a Message
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;