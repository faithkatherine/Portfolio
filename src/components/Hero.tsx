"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="text-2xl mb-2 block">👋 Hello, World!</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-2">
                I&apos;m Faith
              </h1>
              <h2 className="text-5xl md:text-7xl font-extrabold text-purple-600 mb-4">
                Full-Stack Engineer
              </h2>
              <p className="text-xl text-gray-800 font-medium">
                With 3+ years experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <a
                href="#pursuit"
                className="px-8 py-3 bg-white text-gray-800 rounded-lg text-base font-bold hover:shadow-xl transition-all border border-gray-200"
              >
                View Portfolio
              </a>
              <a
                href="/Faith_Catherine_Otieno_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-gray-800 rounded-lg text-base font-bold hover:shadow-xl transition-all border border-gray-200"
              >
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-t border-gray-300 pt-6"
            >
              <p className="text-sm text-gray-600 mb-3">
                Worked with companies
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <span className="text-gray-700 font-semibold">
                  Walking on Earth
                </span>
                <span className="text-gray-700 font-semibold">Pursuit HQ</span>
                <span className="text-gray-700 font-semibold">Andela</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual element / Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="aspect-[3/4] bg-gradient-to-br from-white/40 to-white/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">FC</span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Faith Catherine Otieno
                  </p>
                </div>
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-6 shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs">Passion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
