import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} DendriteSoft. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 justify-center sm:justify-end">
          <a href="http://dendritesoft.com/" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="http://dendritesoft.com/" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          <a href="http://dendritesoft.com/" className="hover:text-white transition-colors duration-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

