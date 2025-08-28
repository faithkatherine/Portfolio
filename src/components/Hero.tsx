'use client';

import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
        >
          Faith Catherine Otieno
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          Fullstack Software Engineer
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
        >
          Building scalable web and mobile applications with React, React Native, Django, and GraphQL.
          Passionate about clean code, maintainable architecture, and leveraging AI tools to enhance development efficiency.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center space-x-6"
        >
          <a
            href="mailto:faithcathy12@gmail.com"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-gray-900"
          >
            <FaEnvelope className="h-5 w-5" />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/faithkatherine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-gray-900"
          >
            <FaGithub className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
