"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    company: "Walking on Earth",
    role: "Mobile Product Engineer",
    period: "2023 - 2025",
    achievement:
      "Owned mindfulness session work across product spec, React Native implementation, and distributed collaboration between Nairobi and London.",
  },
  {
    company: "Pursuit HQ",
    role: "Founder-minded Builder",
    period: "2024 - Present",
    achievement:
      "Building a hyperlocal discovery platform for Nairobi with editorial workflows, GraphQL APIs, and mobile-first product design.",
  },
  {
    company: "Reaction Power",
    role: "Python + Analytics Engineer",
    period: "2023",
    achievement:
      "Worked on recommendation logic and translated product data into decision-ready reporting through GA4 and Looker Studio.",
  },
  {
    company: "Nifty Works via Andela",
    role: "Full-Stack Developer",
    period: "2022 - 2023",
    achievement:
      "Delivered client product work across frontend and backend surfaces while sharpening remote engineering habits.",
  },
];

const principles = [
  "I care about product clarity before implementation speed.",
  "I like systems that are simple enough to maintain and strong enough to scale.",
  "I learn quickly, document the messy parts, and keep the user in view.",
];

const Experience = () => {
  return (
    <section id="about" className="bg-[#FAFAF8] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker">About me</p>
            <h2 className="mt-4 text-[clamp(2.8rem,7vw,6.1rem)] font-bold leading-[0.98] text-[#20201F]">
              Engineer. Builder. Product thinker.
            </h2>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-[#55514C]">
              I am a software engineer who works across the full path from
              product question to shipped experience. I care about clear
              architecture, thoughtful interfaces, and the practical delivery
              decisions that make software usable.
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-2xl border border-black/[0.05] bg-white/82 p-8 shadow-paper"
            >
              <p className="text-2xl font-bold leading-snug text-[#20201F] md:text-3xl">
                I like products where the backend decisions, UI details, and
                business logic all have to make sense together.
              </p>
              <p className="mt-5 leading-relaxed text-[#55514C]">
                That is why Pursuit matters to me: it is not just a codebase, it
                is an attempt to make local discovery feel cared for. The same
                thread runs through my client and team work: make the useful
                thing feel intentional.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {["Building products", "Learning", "Travel", "Creativity", "Community", "Founder energy"].map(
                (interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="rounded-xl border border-black/[0.05] bg-white/82 p-5 shadow-paper transition hover:-translate-y-0.5 hover:shadow-paper-hover"
                  >
                    <p className="text-lg font-bold text-[#20201F]">
                      {interest}
                    </p>
                  </motion.div>
                ),
              )}
            </div>

            <div className="rounded-2xl bg-[#20201F] p-8 text-white shadow-paper-hover">
              <p className="section-kicker text-white/55">How I work</p>
              <div className="mt-6 grid gap-4">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <p className="text-lg font-bold leading-relaxed">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="experience" className="mt-24">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Career timeline</p>
            <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.2rem)] font-bold leading-[0.98] text-[#20201F]">
              The path has been practical, product-facing, and increasingly
              self-directed.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#FF8A65] via-[#FF7597] to-[#9C6FDE] md:block" />
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.article
                  key={`${item.company}-${item.period}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative grid gap-4 rounded-2xl border border-black/[0.05] bg-white/82 p-6 shadow-paper transition hover:-translate-y-0.5 hover:shadow-paper-hover md:ml-12 md:grid-cols-[0.75fr_1.25fr] md:p-8"
                >
                  <span className="absolute -left-[3.25rem] top-8 hidden h-8 w-8 rounded-full border-4 border-[#FAFAF8] bg-gradient-to-br from-[#FF8A65] to-[#9C6FDE] shadow-paper md:block" />
                  <div>
                    <p className="text-sm font-extrabold uppercase text-[#8A8178]">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[#20201F]">
                      {item.role}
                    </h3>
                    <p className="mt-1 font-bold text-[#6F6A64]">
                      {item.company}
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed text-[#55514C]">
                    {item.achievement}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
