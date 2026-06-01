"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Let&apos;s Connect
        </h2>
        <p className="text-xl text-white/80 mb-12">
          Available for freelance projects and full-time opportunities
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="mailto:faithcathy12@gmail.com"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <FaEnvelope className="h-5 w-5" />
            <span>faithcathy12@gmail.com</span>
          </a>
          <a
            href="https://github.com/faithkatherine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border-2 border-white rounded-lg text-lg font-bold hover:bg-white/20 transition-all"
          >
            <FaGithub className="h-5 w-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/faith-catherine-otieno-92b708199"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border-2 border-white rounded-lg text-lg font-bold hover:bg-white/20 transition-all"
          >
            <FaLinkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>
        </div>
        <div className="mt-16 text-white/60 text-sm">
          <p>
            © 2026 Faith Catherine Otieno. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
