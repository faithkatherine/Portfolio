"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  {
    label: "Email",
    href: "mailto:faithcathy12@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    href: "https://github.com/faithkatherine",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/faith-catherine-otieno-92b708199",
    icon: FaLinkedin,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="bg-[#20201F] px-4 py-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#FAFAF8] px-6 py-20 shadow-paper-hover lg:px-12 lg:py-24">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-[3rem] bg-gradient-to-br from-[#FF8A65] via-[#FF7597] to-[#9C6FDE] opacity-25 blur-3xl" />
        <div className="absolute -bottom-24 left-12 h-64 w-44 rotate-12 rounded-[3rem] bg-gradient-to-br from-[#FFC06B] to-[#FF87C3] opacity-20 blur-2xl" />

        <div className="relative max-w-4xl">
          <p className="section-kicker">Contact</p>
          <h2 className="mt-5 text-[clamp(3rem,8vw,6.8rem)] font-bold leading-[0.96] text-[#20201F]">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-[#55514C]">
            I am open to full-time product engineering roles, thoughtful
            freelance builds, and collaborations where the problem is worth
            caring about.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {links.map(({ label, href, icon: Icon }, index) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${
                  index === 0
                    ? "gradient-button text-white shadow-soft-glow focus:ring-[#FF87C3]/30"
                    : "border border-black/[0.05] bg-white text-[#20201F] shadow-paper hover:shadow-paper-hover focus:ring-[#20201F]/10"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-16 flex flex-col gap-3 border-t border-[#20201F]/10 pt-6 text-sm font-semibold text-[#6F6A64] sm:flex-row sm:items-center sm:justify-between">
          <p>Faith Catherine Otieno</p>
          <p>Built with Next.js, Tailwind CSS, and a product-builder bias.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
