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
    <section
      id="contact"
      className="relative overflow-hidden bg-[#141312] px-6 py-24 text-white lg:px-12 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,138,101,0.24),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(156,111,222,0.22),transparent_32%),linear-gradient(135deg,#141312_0%,#201716_48%,#181421_100%)]" />
      <div className="absolute -bottom-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF8A65]/20 via-[#FF87C3]/16 to-[#9C6FDE]/18 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase text-[#FFB497]">Contact</p>
          <h2 className="mt-5 text-[clamp(3rem,8vw,6.8rem)] font-bold leading-[0.96] text-white">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/72">
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
                    : "border border-white/10 bg-white/[0.07] text-white hover:bg-white/[0.12] focus:ring-white/15"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 text-sm font-semibold text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Faith Catherine Otieno</p>
          <p>Built with Next.js, Tailwind CSS, and a product-builder bias.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
