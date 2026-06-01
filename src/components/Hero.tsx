"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFAF8] pt-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -right-20 top-24 h-72 w-72 rounded-[36px] bg-gradient-to-br from-[#FF8A65] via-[#FF7597] to-[#9C6FDE] opacity-20 blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * 0.012,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 24 }}
        />
        <motion.div
          className="absolute -left-24 bottom-24 h-80 w-52 rotate-12 rounded-[44px] bg-gradient-to-br from-[#FFC06B] to-[#FF87C3] opacity-20 blur-2xl"
          animate={{
            x: mousePosition.x * 0.012,
            y: mousePosition.y * -0.012,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 24 }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 sm:py-20 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[1.02fr_0.98fr] lg:px-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#2D2D2D]/10 bg-white/70 px-4 py-2 text-sm font-bold text-[#2D2D2D] shadow-sm backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#FF8A65] to-[#9C6FDE]" />
            Hello World
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-y-4"
          >
            <p className="text-sm font-bold uppercase text-[#6F6A64]">
              Software engineer + product builder
            </p>
            <h1 className="max-w-4xl text-[clamp(3.6rem,11vw,8rem)] font-bold leading-[0.95] text-[#20201F]">
              Faith Catherine Otieno
            </h1>
            <h2 className="gradient-text text-[clamp(2.1rem,5.5vw,4.9rem)] font-bold leading-[1]">
              Software Engineer + Product Builder
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="max-w-2xl text-xl leading-relaxed text-[#55514C] md:text-2xl"
          >
            Full-stack engineer turning ambitious ideas into real products
            across frontend, backend, and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#work"
              className="gradient-button rounded-xl px-7 py-4 text-center text-base font-bold text-white shadow-soft-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#FF87C3]/30"
            >
              View featured work
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-black/[0.05] bg-white px-7 py-4 text-center text-base font-bold text-[#20201F] shadow-paper transition hover:-translate-y-0.5 hover:shadow-paper-hover focus:outline-none focus:ring-4 focus:ring-[#20201F]/10"
            >
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="grid max-w-2xl grid-cols-3 gap-4 border-t border-[#20201F]/10 pt-7"
          >
            {[
              ["3+", "Years building"],
              ["10+", "Product surfaces"],
              ["Nairobi", "Global teams"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold text-[#20201F]">
                  {value}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#6F6A64]">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-black/[0.05] bg-white/72 p-4 shadow-paper-hover backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#F2F0EA]">
              <div className="absolute inset-x-0 top-0 h-20 bg-[#151413]" />
              <div className="absolute left-6 top-7 h-1.5 w-8 rounded-full bg-white/80" />
              <div className="absolute right-6 top-5 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-white/70" />
                <span className="h-3 w-3 rounded-full bg-white/35" />
              </div>
              <div className="absolute inset-x-8 top-28">
                <p className="text-sm font-bold text-[#20201F]">
                  Building with product sense
                </p>
                <div className="mt-5 h-20 rounded-xl bg-gradient-to-r from-[#FF8A65] via-[#FF7597] to-[#9C6FDE]" />
                <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] gap-4">
                  <div className="rounded-xl bg-white p-5 shadow-paper">
                    <p className="text-5xl font-bold gradient-text">FO</p>
                    <p className="mt-4 text-sm font-bold text-[#6F6A64]">
                      Full-stack systems, mobile UX, and product loops.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#20201F] p-5 text-white shadow-paper">
                    <p className="text-sm font-bold text-white/70">Pursuit</p>
                    <p className="mt-4 text-2xl font-bold leading-tight">
                      Hyperlocal discovery for Nairobi.
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 right-8 rounded-xl bg-white/86 p-5 shadow-paper-hover backdrop-blur"
              >
                <p className="text-xs font-bold uppercase text-[#6F6A64]">
                  Current focus
                </p>
                <p className="mt-1 text-lg font-bold text-[#20201F]">
                  Mobile-first products
                </p>
              </motion.div>
              <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-[42px] bg-gradient-to-br from-[#FF8A65] to-[#FF87C3] opacity-50 blur-2xl" />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-4 hidden rounded-xl border border-white/70 bg-white/82 p-5 shadow-paper-hover backdrop-blur sm:block"
          >
            <p className="text-4xl font-bold gradient-text">01</p>
            <p className="mt-1 text-sm font-bold text-[#55514C]">
              Builder mindset
            </p>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 4, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-12 hidden h-28 w-28 rounded-xl border border-black/[0.05] bg-[#FAFAF8] shadow-paper lg:block"
          >
            <div className="absolute left-6 top-7 h-14 w-14 rounded-full border-4 border-[#FF8A65]" />
            <div className="absolute bottom-5 right-5 h-10 w-10 rounded-full border-4 border-[#9C6FDE]" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 pb-10 text-sm font-bold text-[#6F6A64] lg:px-12">
        <span>Walking on Earth</span>
        <span className="h-1 w-1 rounded-full bg-[#6F6A64]" />
        <span>Pursuit HQ</span>
        <span className="h-1 w-1 rounded-full bg-[#6F6A64]" />
        <span>Andela network</span>
      </div>
    </section>
  );
};

export default Hero;
