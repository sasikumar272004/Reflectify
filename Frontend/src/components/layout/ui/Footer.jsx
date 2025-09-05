import { motion } from "framer-motion";
import { RiMentalHealthLine } from 'react-icons/ri';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative bg-[#2c303d] text-gray-300 py-10 px-6 sm:px-12">
     
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-3 text-xl font-semibold text-white">
          <RiMentalHealthLine size={28} />
          <span>Reflectify</span>
        </div>
        <div className="flex space-x-6 text-gray-400 hover:text-white transition-colors duration-300">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <FiTwitter size={24} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <FiFacebook size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500">
            <FiInstagram size={24} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
            <FiLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Reflectify. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
