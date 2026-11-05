import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Channel = {
  id: string;
  number: string;
  short: string;
  title: string;
  tint: string;
  signalText: string;
};

type Opinion = {
  topic: string;
  quote: string;
  body: string;
  practice: string[];
  tags: string[];
};

type Experience = {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
  tags: string[];
  link?: string;
};

const channels: Channel[] = [
  {
    id: "hello",
    number: "01",
    short: "Hello",
    title: "HELLO",
    tint: "blue",
    signalText: "Products from data model to the screen in your hand.",
  },
  {
    id: "think",
    number: "02",
    short: "How I think",
    title: "HOW I THINK",
    tint: "indigo",
    signalText: "Trade-offs make the product legible.",
  },
  {
    id: "blocks",
    number: "03",
    short: "Building blocks",
    title: "BUILDING BLOCKS",
    tint: "lilac",
    signalText: "Strong foundations, then useful abstractions.",
  },
  {
    id: "experience",
    number: "04",
    short: "Experience",
    title: "EXPERIENCE",
    tint: "pink",
    signalText: "Learn fast. Ship carefully. Keep moving.",
  },
  {
    id: "projects",
    number: "05",
    short: "Projects",
    title: "PROJECTS",
    tint: "blue",
    signalText: "Small bets, shipped end to end.",
  },
  {
    id: "offclock",
    number: "06",
    short: "Off the clock",
    title: "OFF THE CLOCK",
    tint: "indigo",
    signalText: "Curiosity is part of the toolkit.",
  },
  {
    id: "contact",
    number: "07",
    short: "Contact",
    title: "CONTACT",
    tint: "lilac",
    signalText: "Open for good problems.",
  },
];

const opinions: Opinion[] = [
  {
    topic: "Backend",
    quote: "APIs are contracts.",
    body: "An endpoint is a promise to whoever calls it. I keep schemas typed, versioned and documented, so breaking a client is a decision, never an accident.",
    practice: [
      "One GraphQL schema serving Pursuit's iOS and web apps",
      "Jira and Slack API integrations for B2B customers at WONE.",
    ],
    tags: ["Django", "GraphQL", "PostgreSQL"],
  },
  {
    topic: "Payments",
    quote: "Money moves exactly once.",
    body: "When a payment request retries, nobody should pay twice. I build payment flows with idempotency keys and row locks from the first commit.",
    practice: [
      "M-Pesa STK Push via Safaricom Daraja in Pursuit",
      "Redis idempotency keys plus SELECT FOR UPDATE on every charge.",
    ],
    tags: ["M-Pesa Daraja", "Redis", "PostgreSQL"],
  },
  {
    topic: "Mobile",
    quote: "The network is not your friend.",
    body: "People lose signal mid-tap. I design for slow connections, retries and offline states first, then polish the happy path.",
    practice: [
      "Pursuit was designed from day one for intermittent connectivity",
      "Device camera and image capture shipped at WONE.",
    ],
    tags: ["React Native", "Expo", "Firebase"],
  },
  {
    topic: "Data",
    quote: "If you can't measure it, you didn't ship it.",
    body: 'I instrument features from day one, so every release comes with an answer to "did it work?"',
    practice: [
      "Moved recurring reports from slide decks to live Looker Studio dashboards",
      "Google Tag Manager and Analytics set up on company sites.",
    ],
    tags: ["Mixpanel", "Looker Studio", "SQL"],
  },
  {
    topic: "System design",
    quote: "Boring architecture, chosen on purpose.",
    body: "The simplest design that survives growth: queues where work can wait, caches where reads repeat, and a written note on why.",
    practice: [
      "Background work in Celery queues, not request handlers",
      "Redis for locks and idempotency in payment flows.",
    ],
    tags: ["Redis", "Celery", "AWS"],
  },
  {
    topic: "Frontend",
    quote: "The data model comes before the screens.",
    body: "Clear state makes simple interfaces. I settle what the data is and who owns it, and the UI gets easier to build and to change.",
    practice: [
      "A shared / mobile / web code split, so Pursuit reuses logic across platforms",
      "Built WONE's website in React and Next.js.",
    ],
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    topic: "Quality",
    quote: "Tests are how I sleep.",
    body: "Unit tests for logic, end-to-end tests for the flows that matter, and error monitoring for whatever I missed.",
    practice: [
      "Jest for units, Playwright for end-to-end flows",
      "Sentry alerts before users notice.",
    ],
    tags: ["Jest", "Playwright", "Sentry"],
  },
];

const blocks = [
  {
    name: "Data structures & algorithms",
    code: "01",
    headline: "Foundations first.",
    text: "Pick the right structure and half the code disappears. I choose the data structure first, then the algorithm, then the framework.",
    shape: "T",
  },
  {
    name: "Data",
    code: "02",
    headline: "Model it, move it, measure it.",
    text: "Clean schemas, reliable pipelines and numbers people can trust. Currently going deeper into data engineering on AWS.",
    shape: "I",
  },
  {
    name: "Backend",
    code: "03",
    headline: "Logic that's boring to operate.",
    text: "Django and GraphQL APIs, background jobs with Celery, and Postgres indexed before it gets slow.",
    shape: "L",
  },
  {
    name: "System design",
    code: "04",
    headline: "How the pieces talk.",
    text: "Where to queue, where to cache, what fails gracefully, and what it costs to run.",
    shape: "S",
  },
  {
    name: "Frontend & mobile",
    code: "05",
    headline: "The part people touch.",
    text: "Fast, accessible React and React Native apps that feel just as good on a mid-range Android as on a flagship.",
    shape: "O",
  },
];

const experiences: Experience[] = [
  {
    company: "Pursuit HQ",
    role: "Founder",
    date: "Aug 2025–now",
    location: "Nairobi",
    bullets: [
      "I started Pursuit HQ to build my own products and take on software and AI work for clients.",
      "Designed and built Pursuit, a travel app for web and iOS, as the sole engineer",
      "Software development and AI training and evaluation work for clients",
      "[Outcome placeholder]",
    ],
    tags: ["React Native", "Expo", "Django", "M-Pesa"],
    link: "#projects",
  },
  {
    company: "Walking on Earth",
    role: "Feature Lead",
    date: "Oct 2023–Jul 2025",
    location: "UK, remote",
    bullets: [
      "Led features on a B2B digital health platform and shaped how the engineering team worked.",
      "Built the company website in React and Next.js",
      "Shipped profile image capture with device camera handling",
      "Integrated the Jira API and built Slack API features for business customers",
    ],
    tags: ["React", "Next.js", "Jira API", "Slack API"],
  },
  {
    company: "Nifty Works",
    role: "Software Engineer via Andela",
    date: "[dates]",
    location: "Remote",
    bullets: [
      "Joined through Andela's Bridge programme and shipped production code on evenings and weekends, alongside a full-time role.",
      "[What I built]",
      "[A decision I owned]",
      "[Outcome]",
    ],
    tags: ["Andela", "Software engineering"],
  },
  {
    company: "Reaction Power",
    role: "[Role]",
    date: "[dates]",
    location: "Nairobi",
    bullets: [
      "Turned marketing data into decisions.",
      "Social listening, SEO and data analysis on a recurring reporting cadence",
      "Moved reporting from slide decks to live Looker Studio dashboards",
      "Set up Google Tag Manager and Google Analytics",
    ],
    tags: ["Looker Studio", "Google Tag Manager", "Google Analytics"],
  },
  {
    company: "Park Place Business Centre",
    role: "[Role]",
    date: "[dates]",
    location: "Nairobi",
    bullets: [
      "Where I learned how a business actually runs.",
      "Restructured and migrated the website, including booking flows",
      "Ran IT alongside reception, office management and procurement",
      "Worked with Meta and Google Ads data",
    ],
    tags: ["Web", "IT", "Meta Ads", "Google Ads"],
  },
  {
    company: "DewCis Solutions",
    role: "Software Engineering Intern",
    date: "Jun 2021–Feb 2022",
    location: "Nairobi",
    bullets: [
      "My first engineering role.",
      "Built and maintained client sites on WordPress and other CMS platforms",
      "Contributed to a point-of-sale system in an agile team",
      "Mentored in systems thinking through the CodePamoja programme",
    ],
    tags: ["WordPress", "CMS", "Point of sale", "CodePamoja"],
  },
];

const projects = [
  {
    id: "pursuit",
    label: "Pursuit",
    status: "LIVE · iOS + WEB",
    kicker: "PURSUIT",
    title: "Pursuit",
    body: "Plan trips with your people. Vote on the plan, pay with M-Pesa, and keep going when the signal drops.",
    features: [
      "Group plans with swipe-voting",
      "M-Pesa STK Push with Redis idempotency and row locks, so nobody is charged twice",
      "One codebase for iOS and web.",
    ],
    tags: ["React Native", "Expo", "Django", "GraphQL", "PostgreSQL", "Redis"],
    actions: ["Play project"],
  },
  {
    id: "extension",
    label: "Browser extension",
    status: "GITHUB",
    kicker: "BROWSER EXTENSION",
    title: "Browser extension",
    body: "[one-liner placeholder]",
    features: [
      "[feature placeholder]",
      "[feature placeholder]",
      "[feature placeholder]",
    ],
    tags: ["TypeScript"],
    actions: ["Play project"],
  },
  {
    id: "agents",
    label: "Custom AI agents",
    status: "GITHUB · DEMO SOON",
    kicker: "CUSTOM AI AGENTS",
    title: "Custom AI agents",
    body: "[one-liner placeholder]",
    features: [
      "[feature placeholder]",
      "[feature placeholder]",
      "[feature placeholder]",
    ],
    tags: ["Python"],
    actions: ["Play project"],
  },
  {
    id: "chatbot",
    label: "SME support chatbot",
    status: "IN PROGRESS",
    kicker: "SME SUPPORT CHATBOT",
    title: "SME support chatbot",
    body: "An AI agent that answers customers on WhatsApp, Instagram and the web, so small businesses never miss a sale.",
    features: [
      "[feature placeholder]",
      "[feature placeholder]",
      "[feature placeholder]",
    ],
    tags: ["Django", "GraphQL", "AI"],
    actions: ["Play project"],
  },
];

const interests = [
  {
    label: "Chess",
    note: "Climbing toward a 1000 rating, one blunder at a time.",
    glyph: "♞",
  },
  {
    label: "Swimming",
    note: "Laps are where I solve the bugs I couldn't at my desk.",
    glyph: "≈",
  },
  {
    label: "Baking",
    note: "Alternative recipes, run like experiments.",
    glyph: "◒",
  },
  { label: "Fiction", note: "[A book I'm reading now]", glyph: "✦" },
  {
    label: "Quantum computing",
    note: "The long game, learned slowly and on purpose.",
    glyph: "⌁",
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTuning, setIsTuning] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [clock, setClock] = useState("00:00:00");
  const [showMobileHint, setShowMobileHint] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const mobileStackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const requestedIndex = useRef(0);
  const tuneTimer = useRef<number | null>(null);
  const isReducedMotion = prefersReducedMotion === true;
  const activeChannel = channels[activeIndex];

  useEffect(() => {
    if (isReducedMotion) {
      setIsPowered(true);
      return;
    }
    const timer = window.setTimeout(() => setIsPowered(true), 1050);
    return () => window.clearTimeout(timer);
  }, [isReducedMotion]);

  useEffect(() => {
    try {
      if (
        window.innerWidth < 760 &&
        window.localStorage.getItem("faith-tv-mobile-hint-seen") !== "1"
      ) {
        setShowMobileHint(true);
        const timer = window.setTimeout(() => {
          setShowMobileHint(false);
          window.localStorage.setItem("faith-tv-mobile-hint-seen", "1");
        }, 4000);
        return () => window.clearTimeout(timer);
      }
    } catch {
      return undefined;
    }
  }, []);

  useEffect(
    () => () => {
      if (tuneTimer.current !== null) window.clearTimeout(tuneTimer.current);
    },
    [],
  );

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-KE", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const tuneTo = (nextIndex: number) => {
    const normalized = (nextIndex + channels.length) % channels.length;
    if (normalized === requestedIndex.current && normalized === activeIndex)
      return;
    requestedIndex.current = normalized;
    if (tuneTimer.current !== null) window.clearTimeout(tuneTimer.current);
    if (isReducedMotion) {
      setActiveIndex(normalized);
      return;
    }
    setActiveIndex(normalized);
    setIsTuning(true);
    tuneTimer.current = window.setTimeout(() => setIsTuning(false), 800);
  };

  const stepChannel = (step: number) => tuneTo(requestedIndex.current + step);

  useEffect(() => {
    const stack = mobileStackRef.current;
    if (!stack || window.innerWidth >= 760) return;
    const panels = Array.from(
      stack.querySelectorAll<HTMLElement>("[data-channel-index]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const nextIndex = Number(
          (visible.target as HTMLElement).dataset.channelIndex,
        );
        if (nextIndex !== activeIndex) tuneTo(nextIndex);
      },
      { root: stack, threshold: [0.6, 0.85] },
    );
    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    const stack = mobileStackRef.current;
    if (!stack || window.innerWidth >= 760) return;
    const panel = stack.querySelector<HTMLElement>(
      `[data-channel-index="${activeIndex}"]`,
    );
    panel?.scrollIntoView({
      behavior: isReducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
    document
      .querySelector<HTMLElement>(".desktop-guide-item.active")
      ?.scrollIntoView({
        behavior: isReducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
  }, [activeIndex, isReducedMotion]);

  const dismissMobileHint = () => {
    if (!showMobileHint) return;
    setShowMobileHint(false);
    try {
      window.localStorage.setItem("faith-tv-mobile-hint-seen", "1");
    } catch {
      /* no-op */
    }
  };

  const handleMobileTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleMobileTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined || Math.abs(end - start) < 45)
      return;
    dismissMobileHint();
    stepChannel(end < start ? 1 : -1);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("button, a, input, textarea, select")
      )
        return;
      if (event.key === "ArrowUp" || event.key === "ArrowRight") {
        event.preventDefault();
        stepChannel(1);
      }
      if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
        event.preventDefault();
        stepChannel(-1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        tuneTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        tuneTo(channels.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="wordmark" aria-label="Faith Otieno home">
          <span className="wordmark-dot" />
          <span>FAITH OT.</span>
        </div>
        <nav className="desktop-guide" aria-label="TV guide">
          {channels.map((channel, index) => (
            <button
              key={channel.id}
              className={`desktop-guide-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => tuneTo(index)}
              aria-label={`Tune to channel ${channel.number}, ${channel.short}`}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-pressed={index === activeIndex}
            >
              <span className="guide-number mono">{channel.number}</span>
              <span>{channel.short}</span>
            </button>
          ))}
        </nav>
        <div className="header-status">
          <span className="live-dot" />
          <span className="mono">Nairobi / {clock}</span>
          <span className="status-divider" />
          <span className="mono header-now">Now: building Pursuit</span>
        </div>
      </header>

      <main className="stage-layout">
        <aside className="left-rail" aria-label="Portfolio context">
          <div className="rail-stamp">FT / 2025—26</div>
          <p className="rail-vertical">FULL-STACK ENGINEER · FOUNDER</p>
          <div className="signal-note">
            <span className="mono">SIGNAL / {activeChannel.number}</span>
            <p>{activeChannel.signalText}</p>
          </div>
          <div className="rail-line" />
          <span className="mono rail-foot">NBO → EVERYWHERE</span>
        </aside>

        <section
          className="tv-stage"
          aria-label="Faith Otieno portfolio television"
        >
          <div className="antenna antenna-left" />
          <div className="antenna antenna-right" />
          <div className="antenna-cap antenna-cap-left" />
          <div className="antenna-cap antenna-cap-right" />
          <div className="tv-body">
            <div className={`screen-bezel ${isPowered ? "is-powered" : ""}`}>
              <div
                className={`tv-screen tint-${activeChannel.tint} ${isTuning ? "is-tuning" : ""}`}
              >
                <div className="screen-corner screen-corner-tl" />
                <div className="screen-corner screen-corner-br" />
                <div className="screen-scanlines" />
                <div className="screen-glare" />
                <AnimatePresence>
                  {!isPowered && (
                    <motion.div
                      className="power-line"
                      initial={{ scaleY: 0.01 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  )}
                  {isTuning && (
                    <>
                      <motion.div
                        className="static-burst"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.95, 0.65, 0.28, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="static-channel-code mono"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.5 }}
                        aria-hidden="true"
                      >
                        CH {activeChannel.number}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                {isPowered && (
                  <div className="screen-content">
                    <ChannelContent channel={activeChannel} onTune={tuneTo} />
                  </div>
                )}
                {isPowered && (
                  <div
                    className="mobile-screen-stack"
                    ref={mobileStackRef}
                    onTouchStart={handleMobileTouchStart}
                    onTouchEnd={handleMobileTouchEnd}
                  >
                    {channels.map((channel, index) => (
                      <section
                        className="mobile-channel-panel"
                        data-channel-index={index}
                        key={channel.id}
                      >
                        <ChannelContent channel={channel} onTune={tuneTo} />
                        {index === 0 && (
                          <div className="mobile-context">
                            <span className="facts-label mono">
                              A LITTLE CONTEXT
                            </span>
                            <p>
                              3+ years · Nairobi · remote with UK and global
                              teams. I like turning fuzzy problems into clear,
                              useful products.
                            </p>
                            <div className="stack-list">
                              {[
                                "React",
                                "React Native",
                                "TypeScript",
                                "Django",
                                "GraphQL",
                                "PostgreSQL",
                              ].map((tag) => (
                                <span key={tag} className="stack-chip">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              className="hire-button"
                              onClick={() => tuneTo(6)}
                            >
                              <span>Hire me</span>
                              <span className="button-arrow">↗</span>
                            </button>
                          </div>
                        )}
                      </section>
                    ))}
                    {showMobileHint && (
                      <div className="mobile-channel-hint" role="status">
                        <span>Scroll or swipe to change channel</span>
                        <span className="hint-chevron">⌄</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="screen-signal mono" aria-live="polite">
                  CH {activeChannel.number} / {activeChannel.title}
                </div>
              </div>
            </div>
            <ControlPanel
              channel={activeChannel}
              isPowered={isPowered}
              onDialClick={() => stepChannel(1)}
              onStep={stepChannel}
            />
          </div>
          <div className="tv-foot">
            <span />
            <span />
            <span />
          </div>
          <p className="tv-caption mono">
            TUNE THE SIGNAL / MAKE SOMETHING USEFUL
          </p>
        </section>

        <aside className="facts-column">
          <div className="facts-label mono">A LITTLE CONTEXT</div>
          <h1>
            Engineer by trade.
            <br />
            <em>Builder by instinct.</em>
          </h1>
          <p className="facts-summary">
            3+ years · Nairobi · remote with UK and global teams. I like turning
            fuzzy problems into clear, useful products.
          </p>
          <div className="stack-list" aria-label="Technology stack">
            {[
              "React",
              "React Native",
              "TypeScript",
              "Django",
              "GraphQL",
              "PostgreSQL",
            ].map((tag) => (
              <span key={tag} className="stack-chip">
                {tag}
              </span>
            ))}
          </div>
          <button className="hire-button" onClick={() => tuneTo(6)}>
            <span>Hire me</span>
            <span className="button-arrow">↗</span>
          </button>
          <div className="facts-footer mono">
            <span>AVAILABLE FOR</span>
            <span>GOOD PROBLEMS</span>
          </div>
        </aside>
      </main>

      <div className="mobile-remote" aria-label="Mobile channel remote">
        <button
          onClick={() => {
            dismissMobileHint();
            stepChannel(-1);
          }}
          aria-label="Previous channel"
        >
          CH −
        </button>
        <span className="mono">{activeChannel.number} / 07</span>
        <button
          onClick={() => {
            dismissMobileHint();
            stepChannel(1);
          }}
          aria-label="Next channel"
        >
          CH +
        </button>
      </div>

      <nav className="tv-guide" aria-label="TV guide">
        <div className="guide-heading mono">TV GUIDE</div>
        <div className="guide-scroll">
          {channels.map((channel, index) => (
            <button
              key={channel.id}
              className={`guide-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => tuneTo(index)}
              aria-label={`Tune to channel ${channel.number}, ${channel.short}`}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-pressed={index === activeIndex}
            >
              <span className="guide-number mono">{channel.number}</span>
              <span>{channel.short}</span>
              {index === activeIndex && <span className="guide-live-dot" />}
            </button>
          ))}
        </div>
        <div className="guide-hint mono">ARROW KEYS TO TUNE</div>
      </nav>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} FAITH OTIENO</span>
        <span className="footer-rule" />
        <span>MADE IN NAIROBI / BROADCASTING WORLDWIDE</span>
      </footer>
    </div>
  );
}

function ControlPanel({
  channel,
  isPowered,
  onDialClick,
  onStep,
}: {
  channel: Channel;
  isPowered: boolean;
  onDialClick: () => void;
  onStep: (step: number) => void;
}) {
  return (
    <div className="control-panel">
      <div className="control-brand">
        <span className="control-brand-mark">F</span>
        <span className="mono">FAITH / TV</span>
      </div>
      <div className="control-row">
        <div className="dial-wrap">
          <button
            className={`dial ${isPowered ? "dial-ready" : ""}`}
            style={
              {
                "--dial-angle": `${Number(channel.number) * 40 - 40}deg`,
              } as CSSProperties
            }
            onClick={onDialClick}
            aria-label="Turn channel dial. Click for next channel."
            title="Click for next channel"
          >
            <span className="dial-notch" />
            <span className="dial-center" />
          </button>
          <span className="mono dial-label">CHANNEL</span>
        </div>
        <div className="channel-buttons">
          <button
            className="channel-button"
            onClick={() => onStep(1)}
            aria-label="Next channel"
          >
            <span>CH</span>
            <strong>+</strong>
          </button>
          <button
            className="channel-button"
            onClick={() => onStep(-1)}
            aria-label="Previous channel"
          >
            <span>CH</span>
            <strong>−</strong>
          </button>
        </div>
      </div>
      <div className="speaker" aria-label="Speaker grille">
        {Array.from({ length: 30 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="control-bottom">
        <span className={`power-led ${isPowered ? "on" : ""}`} />
        <span className="mono">POWER / {isPowered ? "ON" : "BOOTING"}</span>
        <span className="control-frequency mono">000.07 FM</span>
      </div>
    </div>
  );
}

function ChannelContent({
  channel,
  onTune,
}: {
  channel: Channel;
  onTune?: (index: number) => void;
}) {
  switch (channel.id) {
    case "hello":
      return <HelloChannel onTune={onTune} />;
    case "think":
      return <ThinkChannel />;
    case "blocks":
      return <BlocksChannel />;
    case "experience":
      return <ExperienceChannel />;
    case "projects":
      return <ProjectsChannel />;
    case "offclock":
      return <OffClockChannel />;
    case "contact":
      return <ContactChannel />;
    default:
      return null;
  }
}

function ChannelHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="channel-header">
      <div>
        <span className="mono channel-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function HelloChannel({ onTune }: { onTune?: (index: number) => void }) {
  const ticker =
    "NAIROBI, KENYA · REACT · REACT NATIVE · TYPESCRIPT · DJANGO · GRAPHQL · POSTGRESQL · REMOTE WITH UK & GLOBAL TEAMS · NOW BUILDING PURSUIT · ";
  return (
    <div className="hello-channel hello-windows">
      <div className="retro-window hello-window-main">
        <div className="retro-window-bar">
          <span>faith_otieno.exe</span>
          <span className="window-dots">— □ ×</span>
        </div>
        <div className="retro-window-body hello-main-body">
          <span className="mono channel-eyebrow">01 / HELLO</span>
          <h2>Hello, I'm Faith.</h2>
          <p>
            Full-stack engineer. I build products end to end, from the data
            model to the screen in your hand.
          </p>
          <div className="hello-creds mono">
            <span>PREVIOUSLY</span>
            <b>Feature Lead · Walking on Earth (UK)</b>
            <span>NOW</span>
            <b>Founder · Pursuit HQ</b>
          </div>
          <div className="hello-shortcuts">
            <span className="mono shortcut-label">JUMP TO A CHANNEL</span>
            <div>
              <button onClick={() => onTune?.(1)}>
                <b>02</b> How I think
              </button>
              <button onClick={() => onTune?.(2)}>
                <b>03</b> Building blocks
              </button>
              <button onClick={() => onTune?.(3)}>
                <b>04</b> Experience
              </button>
              <button onClick={() => onTune?.(4)}>
                <b>05</b> Projects
              </button>
              <button onClick={() => onTune?.(6)}>
                <b>07</b> Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="retro-window hello-window-stats">
        <div className="retro-window-bar">
          <span>stats</span>
          <span className="window-dots">□ ×</span>
        </div>
        <div className="hello-stat-tiles">
          <div className="hello-stat-tile">
            <strong>3+ yrs</strong>
            <span>shipping to production</span>
          </div>
          <div className="hello-stat-tile">
            <strong>6 roles</strong>
            <span>intern to founder</span>
          </div>
          <div className="hello-stat-tile">
            <strong>1 app</strong>
            <span>built solo: Pursuit</span>
          </div>
        </div>
      </div>
      <div className="retro-window hello-window-readme">
        <div className="retro-window-bar">
          <span>read_me.txt</span>
          <span className="window-dots">□ ×</span>
        </div>
        <div className="hello-readme-body">
          <dl>
            <div>
              <dt className="mono">STATUS</dt>
              <dd>Open to: full-time · contract · partnerships</dd>
            </div>
            <div>
              <dt className="mono">BASED</dt>
              <dd>Nairobi, Kenya · remote with UK &amp; global teams</dd>
            </div>
            <div>
              <dt className="mono">CURRENTLY</dt>
              <dd>Building Pursuit · learning data engineering on AWS</dd>
            </div>
          </dl>
          <button>Don’t forget the résumé ↓</button>
        </div>
      </div>
      <div className="hello-ticker mono" aria-label={ticker}>
        <div className="ticker-track" aria-hidden="true">
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>
    </div>
  );
}

function ThinkChannel() {
  const [opinionIndex, setOpinionIndex] = useState(0);
  const opinion = opinions[opinionIndex];
  return (
    <div className="think-channel think-split">
      <div className="folder-drawer" aria-label="How I think folders">
        <span className="mono drawer-label">FIELD NOTES / 07</span>
        <div className="shelf-files">
          {opinions.map((item, index) => (
            <button
              key={item.topic}
              className={`think-folder folder-${index} ${index === opinionIndex ? "selected" : ""}`}
              onClick={() => setOpinionIndex(index)}
              aria-pressed={index === opinionIndex}
            >
              <span className="folder-tab mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="folder-spine-label">
                <b>{String(index + 1).padStart(2, "0")}</b> {item.topic}
              </span>
            </button>
          ))}
        </div>
        <div className="shelf-base">
          <span className="paper-stack">
            <i />
            <i />
            <i />
          </span>
          <span className="mini-plant">
            <i />
            <i />
            <i />
            <em />
          </span>
        </div>
      </div>
      <div
        className="field-sheet"
        role="region"
        aria-live="polite"
        aria-label={`${opinion.topic} engineering principle`}
      >
        <span className="paperclip" />
        <span className="mono field-label">
          {String(opinionIndex + 1).padStart(2, "0")}{" "}
          {opinion.topic.toUpperCase()}
        </span>
        <blockquote>“{opinion.quote}”</blockquote>
        <p>{opinion.body}</p>
        <div className="practice-block">
          <span className="mono">IN PRACTICE</span>
          <ul>
            {opinion.practice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="tag-box">
          {opinion.tags.map((tag) => (
            <span key={tag} className="screen-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="field-sheet-footer">
          <div className="arrow-pair">
            <button
              onClick={() =>
                setOpinionIndex(
                  (opinionIndex - 1 + opinions.length) % opinions.length,
                )
              }
              aria-label="Previous principle"
            >
              ←
            </button>
            <button
              onClick={() =>
                setOpinionIndex((opinionIndex + 1) % opinions.length)
              }
              aria-label="Next principle"
            >
              →
            </button>
          </div>
          <span className="faith-signoff">— Faith</span>
          <span className="mono sheet-count">
            {String(opinionIndex + 1).padStart(2, "0")} / 07
          </span>
        </div>
        <div className="field-note-stamp">FIELD NOTE</div>
      </div>
    </div>
  );
}

/* Tetris wall: 5 × 4 cells, tiled exactly. [col, row] with row 0 = bottom. */
const pieces: { cells: [number, number][]; color: string }[] = [
  {
    cells: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    color: "#4b4fa8",
  }, // O · DSA
  {
    cells: [
      [2, 0],
      [3, 0],
      [4, 0],
      [4, 1],
    ],
    color: "#c9b6f0",
  }, // L · Data
  {
    cells: [
      [2, 1],
      [3, 1],
      [3, 2],
      [4, 2],
    ],
    color: "#f2b8d4",
  }, // S · Backend
  {
    cells: [
      [0, 2],
      [1, 2],
      [2, 2],
      [0, 3],
    ],
    color: "#7fa2ec",
  }, // J · System design
  {
    cells: [
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
    ],
    color: "#ff6b1a",
  }, // I · Frontend & mobile
];

function BlocksChannel() {
  const [selected, setSelected] = useState(0);
  const [builtCount, setBuiltCount] = useState(0);
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  const done = builtCount >= blocks.length;
  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(
      () => {
        setSelected(builtCount);
        setBuiltCount((count) => count + 1);
      },
      reduced ? 0 : builtCount === 0 ? 450 : 760,
    );
    return () => window.clearTimeout(timer);
  }, [builtCount, done, reduced]);
  const rebuild = () => {
    setBuiltCount(0);
    setSelected(0);
    setRun((r) => r + 1);
  };
  const dropping = !done && builtCount > 0 ? builtCount - 1 : -1;
  const activeIndex = Math.max(0, Math.min(builtCount - 1, blocks.length - 1));
  const trolleyCol = (() => {
    const piece = pieces[done ? blocks.length - 1 : activeIndex];
    const xs = piece.cells.map(([c]) => c);
    return (Math.min(...xs) + Math.max(...xs) + 1) / 2;
  })();
  const block = blocks[selected];
  return (
    <div className="blocks-channel">
      <ChannelHeader eyebrow="03 / THE STACK" title="Building blocks." />
      <p className="blocks-subtitle">
        Every product is the same stack of decisions.
      </p>
      <div className="blocks-layout">
        <div className="site-scene" key={run}>
          <span className="cloud cloud-a" />
          <span className="cloud cloud-b" />
          <span className="cloud cloud-c" />
          <div className="crane" aria-hidden="true">
            <span className="crane-mast" />
            <span className="crane-cab" />
            <span className="crane-jib" />
            <span className="crane-counter" />
            <span className="crane-weight" />
            <span className="crane-tie" />
          </div>
          <div className="wall-zone">
            <motion.span
              className="crane-trolley"
              aria-hidden="true"
              animate={{ left: `calc(var(--cell) * ${trolleyCol} - 11px)` }}
              transition={{ duration: reduced ? 0 : 0.35, ease: "easeInOut" }}
            />
            <div className={`tetris-wall ${done ? "is-done" : ""}`}>
              {pieces.map((piece, index) => {
                const xs = piece.cells.map(([c]) => c);
                const ys = piece.cells.map(([, r]) => r);
                const minX = Math.min(...xs),
                  maxX = Math.max(...xs),
                  minY = Math.min(...ys),
                  maxY = Math.max(...ys);
                const built = index < builtCount;
                return (
                  <motion.button
                    key={index}
                    className={`tpiece ${selected === index && built ? "selected" : ""}`}
                    style={{
                      left: `calc(var(--cell) * ${minX})`,
                      bottom: `calc(var(--cell) * ${minY})`,
                      width: `calc(var(--cell) * ${maxX - minX + 1})`,
                      height: `calc(var(--cell) * ${maxY - minY + 1})`,
                      zIndex: selected === index ? 5 : 2,
                    }}
                    initial={false}
                    animate={
                      built ? { y: 0, opacity: 1 } : { y: -230, opacity: 0 }
                    }
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 260,
                            damping: 19,
                            mass: 0.9,
                          }
                    }
                    onClick={() => built && setSelected(index)}
                    aria-label={`Show layer ${blocks[index].code}: ${blocks[index].name}`}
                    disabled={!built}
                  >
                    {dropping === index && (
                      <span className="tpiece-cable" aria-hidden="true" />
                    )}
                    {piece.cells.map(([c, r], cellIndex) => (
                      <span
                        key={cellIndex}
                        className="tcell"
                        style={{
                          left: `calc(var(--cell) * ${c - minX})`,
                          bottom: `calc(var(--cell) * ${r - minY})`,
                          background: piece.color,
                        }}
                      >
                        {cellIndex === 0 && (
                          <em className="mono">{blocks[index].code}</em>
                        )}
                      </span>
                    ))}
                  </motion.button>
                );
              })}
              {done && (
                <motion.div
                  className="wall-browser"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  aria-hidden="true"
                >
                  <span className="wall-browser-bar">
                    <i />
                    <i />
                    <i />
                  </span>
                </motion.div>
              )}
            </div>
            <span className={`product-label mono ${done ? "show" : ""}`}>
              = A PRODUCT.
            </span>
          </div>
          <motion.div
            className="dozer"
            aria-hidden="true"
            animate={{ x: done ? 0 : [0, 14, 0] }}
            transition={{
              duration: 0.7,
              repeat: done || reduced ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="dozer-cab" />
            <span className="dozer-body" />
            <span className="dozer-blade" />
            <span className="dozer-track">
              <i />
              <i />
              <i />
              <i />
            </span>
          </motion.div>
          <div className="ground">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="site-plan">
          <div className="site-plan-clip mono">SITE PLAN</div>
          <div className="site-plan-body">
            <span className="mono">LAYER {block.code} / 05</span>
            <h3>{block.headline}</h3>
            <span className="mono plan-name">{block.name.toUpperCase()}</span>
            <p>{block.text}</p>
            <div
              className="plan-progress"
              aria-label={`${builtCount} of 5 layers built`}
            >
              {blocks.map((b, i) => (
                <button
                  key={b.code}
                  className={`${i < builtCount ? "built" : ""} ${i === selected ? "current" : ""}`}
                  onClick={() => i < builtCount && setSelected(i)}
                  aria-label={`Layer ${b.code}`}
                >
                  {b.code}
                </button>
              ))}
            </div>
            <div className="plan-actions">
              <span className="mono block-hint">
                {done ? "CLICK A BLOCK TO INSPECT" : "BUILDING…"}
              </span>
              <button className="rebuild-button" onClick={rebuild}>
                ↻ Rebuild
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tapeCodes = ["T-120", "E-180", "T-90", "SP-60", "T-160", "E-30"];

function ExperienceChannel() {
  const [experienceIndex, setExperienceIndex] = useState(0);
  const role = experiences[experienceIndex];
  const [oneLiner, ...highlights] = role.bullets;
  return (
    <div className="experience-channel">
      <ChannelHeader eyebrow="04 / EXPERIENCE" title="The work reel." />
      <p className="channel-subtitle">Pull a tape from the shelf.</p>
      <div className="experience-split">
        <div className="vhs-shelf2">
          <div className="vhs-row">
            {experiences.map((item, index) => (
              <button
                key={item.company}
                className={`vhs-tape label-${index} ${index === experienceIndex ? "selected" : ""}`}
                onClick={() => setExperienceIndex(index)}
                aria-pressed={index === experienceIndex}
                aria-label={`${item.company}, ${item.date}`}
              >
                <span className="vhs-label">
                  <span className="vhs-label-title">{item.company}</span>
                  <span className="vhs-label-date">{item.date}</span>
                </span>
                <span className="vhs-code mono">{tapeCodes[index]}</span>
                <span className="vhs-logo">VHS</span>
              </button>
            ))}
          </div>
          <div className="vhs-shelf-board" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="sleeve"
            key={role.company}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div className="vhs-tracking" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="sleeve-light">
              <div className="sleeve-top">
                <span className="vhs-logo big">VHS</span>
                <span className="mono">{tapeCodes[experienceIndex]}</span>
              </div>
              <h3>{role.company}</h3>
              <span className="sleeve-role">{role.role}</span>
              <dl className="sleeve-specs mono">
                <div>
                  <dt>YEARS</dt>
                  <dd>{role.date}</dd>
                </div>
                <div>
                  <dt>BASED</dt>
                  <dd>{role.location}</dd>
                </div>
                <div>
                  <dt>TAPE</dt>
                  <dd>{String(experienceIndex + 1).padStart(2, "0")} / 06</dd>
                </div>
              </dl>
              <div className="deck-buttons" aria-hidden="true">
                <i>◀◀</i>
                <i>▶</i>
                <i>▶▶</i>
                <i>■</i>
                <i>●</i>
                <i>⏏</i>
              </div>
              {role.link && (
                <a className="role-link" href={role.link}>
                  VISIT PURSUIT HQ ↗
                </a>
              )}
            </div>
            <div className="sleeve-stripes" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="sleeve-dark">
              <div className="cassette" aria-hidden="true">
                <span className="cassette-label">
                  {role.company.toUpperCase()}
                </span>
                <span className="cassette-window">
                  <i />
                  <i />
                </span>
              </div>
              <p className="tape-one-liner">{oneLiner}</p>
              <span className="mono highlights-label">HIGHLIGHTS</span>
              <ul>
                {highlights.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="tag-row">
                {role.tags.map((tag) => (
                  <span className="screen-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectsChannel() {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [playing, setPlaying] = useState(false);
  const projectIndex = Math.max(
    0,
    projects.findIndex((item) => item.id === projectId),
  );
  const project = projects[projectIndex];
  return (
    <div className="projects-channel">
      <ChannelHeader eyebrow="05 / PROJECTS" title="Things I've made." />
      <div className="projects-split">
        <div className="cd-rack2" role="tablist" aria-label="Projects">
          <span className="mono rack-label">RACK / 04</span>
          <div className="cd-rack-row">
            {projects.map((item, index) => (
              <button
                key={item.id}
                className={`cd-case-spine spine-${index} ${item.id === projectId ? "selected" : ""}`}
                role="tab"
                aria-selected={item.id === projectId}
                onClick={() => {
                  setProjectId(item.id);
                  setPlaying(false);
                }}
              >
                <span className="cd-spine-title">{item.label}</span>
                <small className="mono">{item.status}</small>
              </button>
            ))}
          </div>
          <div className="rack-base" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="jewel"
            role="tabpanel"
            key={project.id}
            initial={{ opacity: 0, y: 8, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
          >
            <div className="jewel-frame">
              <div className="jewel-spine2">
                <span>
                  {project.title.toUpperCase()} · {project.status}
                </span>
              </div>
              <div className="jewel-inner">
                <div className={`jewel-art art-${projectIndex}`}>
                  <div className="art-top mono">
                    <span>{project.kicker}</span>
                    <span className="art-status">{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                  <div className="art-disc" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="jewel-tracks">
                  <span className="mono tracklist-label">TRACKLIST</span>
                  <ol>
                    {project.features.map((feature, i) => (
                      <li key={`${feature}-${i}`}>
                        <span className="mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ol>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span className="screen-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="jewel-controls2">
              <a
                className="play-button"
                href="#contact"
                aria-label={`Play ${project.title}`}
              >
                ▶
              </a>
              <button
                className="mute-button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Mute" : "Unmute"}
              >
                {playing ? "♪" : "×"}
              </button>
              <div className="progress-bar">
                <span style={{ width: playing ? "68%" : "18%" }} />
              </div>
              <span className="mono track-time">
                {playing ? "02:41" : "00:37"} / 03:58
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HobbyIcon({ label }: { label: string }) {
  switch (label) {
    case "Chess":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M22 54h22l-3-8H25zM26 46h14c0-6 4-9 4-16 0-9-7-16-15-16-3 0-5 1-6 3l2 4-6 6 3 4 7-3c0 7-3 12-3 18z" />
          <circle cx="33" cy="22" r="2" className="eye" />
        </svg>
      );
    case "Swimming":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4 6 4 6 4v8H6z" />
          <circle cx="22" cy="22" r="7" />
          <circle cx="42" cy="22" r="7" />
          <path d="M29 22h6" className="line" />
        </svg>
      );
    case "Baking":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M10 34h44l-5 20H15z" />
          <path d="M14 34c0-10 8-16 18-16s18 6 18 16z" className="top" />
          <path d="M24 26v4M32 24v4M40 26v4" className="line" />
        </svg>
      );
    case "Fiction":
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M8 14c9-2 17 0 24 5v33c-7-5-15-7-24-5z" />
          <path d="M56 14c-9-2-17 0-24 5v33c7-5 15-7 24-5z" className="top" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="32" rx="26" ry="9" className="line" />
          <ellipse
            cx="32"
            cy="32"
            rx="26"
            ry="9"
            transform="rotate(60 32 32)"
            className="line"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="26"
            ry="9"
            transform="rotate(120 32 32)"
            className="line"
          />
          <circle cx="32" cy="32" r="5" />
        </svg>
      );
  }
}

function OffClockChannel() {
  const [activePoster, setActivePoster] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setActivePoster((index) => (index + 1) % interests.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const posters = [0, 1, 2].map((offset) => ({
    interest: interests[(activePoster + offset) % interests.length],
    number: (activePoster + offset) % interests.length,
  }));
  return (
    <div className="offclock-channel">
      <ChannelHeader
        eyebrow="06 / OFF THE CLOCK"
        title="Curiosity has many outlets."
      />
      <span className="mono poster-label">Away from the keyboard</span>
      <div className="billboard">
        <div className="poster-wall2">
          {posters.map(({ interest, number }, index) => (
            <motion.button
              key={`${interest.label}-${activePoster}-${index}`}
              className={`poster2 poster2-${number}`}
              onClick={() => setActivePoster(number)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
            >
              <span className="poster-sticker">
                NO. {String(number + 1).padStart(2, "0")}
              </span>
              <span className="poster-icon">
                <HobbyIcon label={interest.label} />
              </span>
              <strong>
                {interest.label.split(" ").map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </strong>
              <span className="poster-note">{interest.note}</span>
              <span className="poster-burst mono">NOW SHOWING</span>
            </motion.button>
          ))}
        </div>
        <div className="billboard-legs">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ContactChannel() {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const lines = [
    {
      n: 1,
      label: "Email",
      href: "mailto:faithcathy12@gmail.com",
      primary: true,
    },
    {
      n: 2,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/faith-catherine-otieno-92b708199/",
    },
    { n: 3, label: "GitHub", href: "https://github.com/faithkatherine" },
  ];
  return (
    <div className="contact-channel">
      <div className="contact-split">
        <div
          className={`booth-wrap ${hoveredLine ? "is-ringing" : ""}`}
          aria-hidden="true"
        >
          <svg
            className="booth-svg"
            viewBox="0 0 260 380"
            preserveAspectRatio="xMidYMax meet"
          >
            <rect
              x="18"
              y="356"
              width="224"
              height="14"
              rx="3"
              className="b-ink"
            />
            <rect
              x="24"
              y="30"
              width="212"
              height="330"
              rx="26"
              className="b-body"
            />
            <rect
              x="24"
              y="30"
              width="212"
              height="56"
              rx="26"
              className="b-roof"
            />
            <rect x="24" y="60" width="212" height="26" className="b-roof" />
            <rect
              x="56"
              y="42"
              width="148"
              height="30"
              rx="6"
              className="b-sign"
            />
            <text x="130" y="63" textAnchor="middle" className="b-sign-text">
              PHONE
            </text>
            <circle cx="40" cy="57" r="5" className="b-bulb" />
            <circle cx="220" cy="57" r="5" className="b-bulb" />
            <rect
              x="44"
              y="100"
              width="172"
              height="244"
              rx="10"
              className="b-inside"
            />
            <rect
              x="104"
              y="140"
              width="52"
              height="74"
              rx="8"
              className="b-phone"
            />
            <rect
              x="114"
              y="168"
              width="32"
              height="34"
              rx="4"
              className="b-keypad"
            />
            <g className="b-keys">
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <circle
                    key={`${r}${c}`}
                    cx={121 + c * 9}
                    cy={175 + r * 10}
                    r="2.4"
                  />
                )),
              )}
            </g>
            <path
              className="b-cord"
              d="M112 208 q-8 6 0 12 q8 6 0 12 q-8 6 0 12 q8 6 0 12 q-8 6 0 12 q8 6 -2 14"
            />
            <g className="b-handset">
              <rect x="98" y="128" width="18" height="58" rx="9" />
              <rect x="94" y="124" width="14" height="16" rx="5" />
              <rect x="94" y="174" width="14" height="16" rx="5" />
            </g>
            <rect
              x="60"
              y="240"
              width="140"
              height="10"
              rx="3"
              className="b-shelf"
            />
            <rect
              x="72"
              y="226"
              width="40"
              height="14"
              rx="2"
              className="b-book"
            />
            <g className="b-door">
              <path
                d="M216 100 L250 116 L250 334 L216 344 Z"
                className="b-door-frame"
              />
              <path
                d="M222 118 L244 128 L244 214 L222 212 Z"
                className="b-glass"
              />
              <path
                d="M222 224 L244 226 L244 318 L222 326 Z"
                className="b-glass"
              />
            </g>
          </svg>
          <div className="booth-bubble">
            {hoveredLine ? "Ring ring!" : "hello?"}
          </div>
        </div>
        <div className="call-board">
          <span className="mono contact-label">THE OPEN CHANNEL</span>
          <h2>Have a good problem?</h2>
          <p>
            I'm always interested in thoughtful products, kind teams, and
            systems that make somebody's day a little easier.
          </p>
          <div className="call-lines">
            {lines.map((line) => (
              <a
                key={line.n}
                onMouseEnter={() => setHoveredLine(line.n)}
                onMouseLeave={() => setHoveredLine(null)}
                onFocus={() => setHoveredLine(line.n)}
                onBlur={() => setHoveredLine(null)}
                href={line.href}
                target={line.href.startsWith("http") ? "_blank" : undefined}
                rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                className={`call-line ${line.primary ? "primary" : ""} ${hoveredLine === line.n ? "lit" : ""}`}
              >
                <span className="line-light" />
                <span className="mono">LINE {line.n}</span>
                <span className="line-name">{line.label}</span>
                <span className="line-arrow">↗</span>
              </a>
            ))}
          </div>
          <span className="mono contact-signoff">NICE TO MEET YOU</span>
        </div>
      </div>
    </div>
  );
}

export default App;
