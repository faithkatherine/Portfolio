"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  {
    number: "3+",
    label: "years experience",
    detail:
      "Production work across digital health, content strategy, client delivery, and independent product building.",
    className: "md:col-span-2",
  },
  {
    number: "10+",
    label: "shipped projects",
    detail:
      "Mobile flows, GraphQL features, analytics instrumentation, dashboards, and end-to-end product experiments.",
    className: "",
  },
  {
    number: "E2E",
    label: "ownership",
    detail:
      "Comfortable moving from product question to schema, API, UI, deployment, QA, and iteration.",
    className: "",
  },
  {
    number: "Mobile -> Backend",
    label: "product engineering",
    detail:
      "React Native interfaces, Apollo/GraphQL integrations, Django services, PostgreSQL data models, and delivery workflows.",
    className: "md:col-span-2",
  },
];

const projects = [
  {
    eyebrow: "Flagship product",
    title: "Pursuit",
    role: "Founder, sole engineer, and product owner",
    problem:
      "Nairobi event discovery is useful but fragmented. Good recommendations live across social feeds, posters, WhatsApp groups, and memory, which makes planning feel harder than it should.",
    built:
      "I am building a mobile-first discovery product with React Native, Django, GraphQL, PostgreSQL, Redis caching, location-aware filtering, event deduplication, authentication, onboarding, and Render-hosted environments.",
    impact:
      "Pursuit is my clearest 0-to-1 product: I own the product decisions, schema, API, mobile UI, infrastructure, and case-study thinking behind the build.",
    stack: [
      "React Native",
      "Expo",
      "Django",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Render",
    ],
    cta: "Open Pursuit Case Study",
    href: "/pursuit-case-study.pdf",
    visual: "pursuit",
  },
  {
    eyebrow: "Mobile + web product engineering",
    title: "Walking on Earth",
    role: "Full-stack software engineer on a UK digital health platform",
    problem:
      "A consumer wellness product needs calm user flows, reliable API-driven features, clear analytics, and stable release practices across both web and mobile surfaces.",
    built:
      "I shipped GraphQL-integrated React and React Native features, worked with Apollo Client query/mutation/fragment patterns, contributed to reusable TypeScript component libraries, and collaborated on evolving schema contracts with backend engineers.",
    impact:
      "I helped improve delivery quality through Firebase/Mixpanel instrumentation, Sentry monitoring, WCAG accessibility improvements, legacy refactors, and async-first collaboration across UK and EAT timezones.",
    stack: [
      "React Native",
      "React",
      "TypeScript",
      "Django",
      "GraphQL",
      "Apollo",
      "Sentry",
      "Mixpanel",
    ],
    cta: "View timeline context",
    href: "#experience",
    visual: "image",
    image: "/wone-product-visual.png",
    imageAlt:
      "Abstract mobile wellness product visual with app screens, completion metrics, and delivery flow cards.",
  },
  {
    eyebrow: "Data + recommendation systems",
    title: "Reaction Power",
    role: "Developer and data analyst",
    problem:
      "The team needed clearer content direction from audience signals: what topics were gaining traction, how users engaged, and what recommendations could guide digital strategy.",
    built:
      "I built a Python-based content recommendation system using social listening signals and engagement trends, implemented GA4/GTM tracking, managed WordPress content, and produced Looker Studio reports.",
    impact:
      "The work translated scattered performance data into executive-facing insights and practical recommendations for content, SEO, and digital engagement decisions.",
    stack: ["Python", "GA4", "GTM", "Looker Studio", "WordPress", "SEO"],
    cta: "View timeline context",
    href: "#experience",
    visual: "image",
    image: "/reaction-power-systems-visual.png",
    imageAlt:
      "Abstract backend systems visual with API blocks, service cards, data layer, and analytics widgets.",
  },
];

const Projects = () => {
  return (
    <>
      <section id="snapshot" className="bg-[#FAFAF8] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="section-kicker">Experience snapshot</p>
              <h2 className="mt-4 text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.98] text-[#20201F]">
                The range to shape, build, and ship.
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-[#55514C]">
              I work best where product judgment and engineering execution meet:
              clarifying the value, designing the system, building the
              experience, and iterating with real constraints in mind.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`rounded-xl border border-black/[0.05] bg-white/82 p-7 shadow-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-paper-hover ${stat.className}`}
              >
                <p className="gradient-text text-4xl font-bold leading-tight md:text-5xl">
                  {stat.number}
                </p>
                <h3 className="mt-5 text-2xl font-bold text-[#20201F]">
                  {stat.label}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-[#6F6A64]">
                  {stat.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Featured work</p>
            <h2 className="mt-4 text-[clamp(2.8rem,8vw,6.4rem)] font-bold leading-[0.98] text-[#20201F]">
              Product stories with engineering underneath.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-[#55514C]">
            Each piece is framed by the product problem, what I built, and the
            impact or capability it represents.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 overflow-hidden rounded-xl border border-black/[0.05] bg-[#FAFAF8] p-4 shadow-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-paper-hover lg:grid-cols-2 lg:items-start"
            >
              <div
                className={`relative self-start overflow-hidden rounded-xl bg-[#F6F1EA] p-3 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {project.visual === "pursuit" ? (
                  <div className="overflow-hidden rounded-lg border border-black/[0.04] bg-white shadow-paper">
                    <iframe
                      src="/Pursuit UI Kit (standalone).html"
                      className="h-[430px] w-full"
                      title="Pursuit UI kit horizontal gallery"
                      style={{ border: "none" }}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-black/[0.04] bg-white shadow-paper">
                    <Image
                      src={project.image ?? ""}
                      alt={project.imageAlt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                )}
              </div>

              <div className="self-start p-4 sm:p-7">
                <p className="section-kicker">{project.eyebrow}</p>
                <h3 className="mt-3 text-4xl font-bold text-[#20201F] md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-base font-bold text-[#6F6A64]">
                  {project.role}
                </p>

                <div className="mt-7 grid gap-5">
                  {[
                    ["Problem", project.problem],
                    ["What I built", project.built],
                    ["Impact", project.impact],
                  ].map(([label, copy]) => (
                    <div key={label}>
                      <p className="text-xs font-bold uppercase text-[#8A8178]">
                        {label}
                      </p>
                      <p className="mt-1 leading-relaxed text-[#55514C]">
                        {copy}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/[0.05] bg-white/78 px-3 py-1.5 text-xs font-bold text-[#55514C]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target={
                    project.href.startsWith("http") ||
                    project.href.endsWith(".pdf")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    project.href.startsWith("http") ||
                    project.href.endsWith(".pdf")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="gradient-button mt-8 inline-flex w-fit items-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-soft-glow transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#FF87C3]/30"
                >
                  {project.cta}
                  <span className="ml-2">-&gt;</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
