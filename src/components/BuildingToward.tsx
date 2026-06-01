"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Pursuit",
    type: "Product lab",
    description:
      "A Nairobi-first discovery product exploring curation, local culture, and mobile-first systems.",
  },
  {
    title: "Technical writing",
    type: "Thinking in public",
    description:
      "Architecture notes, product tradeoffs, and lessons from building with React Native, Django, and GraphQL.",
  },
  {
    title: "Experiments",
    type: "Small bets",
    description:
      "Prototype-driven explorations around AI-assisted workflows, low-bandwidth UX, and creator tooling.",
  },
  {
    title: "Startup ideas",
    type: "Founder notebook",
    description:
      "Early concepts at the intersection of community, discovery, productivity, and creative work.",
  },
];

const BuildingToward = () => {
  return (
    <section id="writing" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Writing & side projects</p>
            <h2 className="mt-4 text-[clamp(2.8rem,7vw,5.6rem)] font-bold leading-[0.98] text-[#20201F]">
              The work around the work.
            </h2>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-[#55514C]">
              I keep a product-builder practice outside of job titles: writing
              down decisions, testing ideas, and turning curiosity into shipped
              artifacts.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group rounded-xl border border-black/[0.05] p-7 shadow-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-paper-hover ${
                  index === 0
                    ? "bg-[#20201F] text-white"
                    : "bg-[#FAFAF8] text-[#20201F]"
                }`}
              >
                <div
                  className={`mb-8 h-16 w-16 rounded-xl ${
                    index === 0
                      ? "bg-gradient-to-br from-[#FF8A65] via-[#FF7597] to-[#9C6FDE]"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <div className="h-full w-full rounded-xl border border-current/10" />
                </div>
                <p
                  className={`text-sm font-extrabold uppercase ${
                    index === 0 ? "text-white/55" : "text-[#8A8178]"
                  }`}
                >
                  {item.type}
                </p>
                <h3 className="mt-3 text-3xl font-bold">{item.title}</h3>
                <p
                  className={`mt-4 leading-relaxed ${
                    index === 0 ? "text-white/75" : "text-[#55514C]"
                  }`}
                >
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingToward;
