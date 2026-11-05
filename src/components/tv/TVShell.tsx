'use client';

import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { channels } from '@/data/tv-content';
import ChannelScreen from './ChannelScreen';
import ControlPanel from './ControlPanel';
import ScrollableChannels from './ScrollableChannels';

export default function TVShell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTuning, setIsTuning] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [clock, setClock] = useState('00:00:00');
  const [isScrollMode, setIsScrollMode] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const requestedIndex = useRef(0);
  const tuneTimer = useRef<number | null>(null);
  const isReducedMotion = prefersReducedMotion === true;
  const activeChannel = channels[activeIndex];

  // Detect screen size for scroll mode (≤1023px)
  useEffect(() => {
    const checkScreenSize = () => setIsScrollMode(window.innerWidth <= 1023);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Power on animation
  useEffect(() => {
    if (isReducedMotion) {
      setIsPowered(true);
      return;
    }
    const timer = window.setTimeout(() => setIsPowered(true), 1050);
    return () => window.clearTimeout(timer);
  }, [isReducedMotion]);

  // Clock update
  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat('en-KE', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Cleanup timer
  useEffect(
    () => () => {
      if (tuneTimer.current !== null) window.clearTimeout(tuneTimer.current);
    },
    []
  );

  const tuneTo = (nextIndex: number) => {
    const normalized = (nextIndex + channels.length) % channels.length;
    if (normalized === requestedIndex.current && normalized === activeIndex) return;
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

  // Arrow key navigation
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('button, a, input, textarea, select')
      )
        return;

      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        stepChannel(1);
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        stepChannel(-1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        tuneTo(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        tuneTo(channels.length - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // Scroll mode for tablet and mobile (≤1023px)
  if (isScrollMode) {
    return (
      <div className="min-h-screen bg-tv-ink text-tv-cream">
        <ScrollableChannels />
      </div>
    );
  }

  // TV mode for desktop (>1023px)
  return (
    <div className="min-h-screen bg-tv-ink text-tv-cream">
      <div className="app-shell">
        <div className="tv-shell">
        {/* Header */}
        <header className="site-header">
          <div className="flex items-center gap-3">
            <span className="wordmark-dot" />
            <span className="font-tv-display text-[13px] font-bold tracking-[0.17em]">FAITH OT.</span>
          </div>

          {/* Desktop channel nav */}
          <nav className="desktop-guide" aria-label="TV guide">
            {channels.map((channel, index) => (
              <button
                key={channel.id}
                className={`desktop-guide-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => tuneTo(index)}
                aria-label={`Tune to channel ${channel.number}, ${channel.short}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-pressed={index === activeIndex}
              >
                <span className="font-tv-mono">{channel.number}</span>
                <span>{channel.short}</span>
              </button>
            ))}
          </nav>

          <div className="header-status">
            <span className="live-dot" />
            <span className="font-tv-mono">Nairobi / {clock}</span>
            <span className="status-divider" />
            <span className="font-tv-mono header-now">Now: building Pursuit</span>
          </div>
        </header>

        {/* Main stage */}
        <main className="stage-layout">
          {/* Left rail */}
          <aside className="left-rail" aria-label="Portfolio context">
            <div className="font-tv-mono text-[10px] tracking-[0.13em] text-tv-orange">
              FT / 2025—26
            </div>
            <p className="rail-vertical">FULL-STACK ENGINEER · FOUNDER</p>
            <div className="signal-note">
              <span className="font-tv-mono">SIGNAL / {activeChannel.number}</span>
              <p>{activeChannel.signalText}</p>
            </div>
            <div className="rail-line" />
            <span className="font-tv-mono rail-foot">NBO → EVERYWHERE</span>
          </aside>

          {/* TV stage */}
          <section className="tv-stage" aria-label="Faith Otieno portfolio television">
            <div className="antenna antenna-left" />
            <div className="antenna antenna-right" />
            <div className="antenna-cap antenna-cap-left" />
            <div className="antenna-cap antenna-cap-right" />

            <div className="tv-body">
              <div className={`screen-bezel ${isPowered ? 'is-powered' : ''}`}>
                <ChannelScreen
                  channel={activeChannel}
                  isTuning={isTuning}
                  isPowered={isPowered}
                  onTune={tuneTo}
                />
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

            <p className="tv-caption font-tv-mono">TUNE THE SIGNAL / MAKE SOMETHING USEFUL</p>
          </section>

          {/* Context column */}
          <aside className="facts-column">
            <div className="font-tv-mono text-[10px] tracking-[0.13em] text-tv-orange">
              A LITTLE CONTEXT
            </div>
            <h1 className="mt-5 font-tv-display text-[clamp(25px,3vw,37px)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Engineer by trade.
              <br />
              <em className="text-tv-orange font-normal">Builder by instinct.</em>
            </h1>
            <p className="facts-summary">
              3+ years · Nairobi · remote with UK and global teams. I like turning fuzzy problems into
              clear, useful products.
            </p>

            <div className="stack-list" aria-label="Technology stack">
              {['React', 'React Native', 'TypeScript', 'Django', 'GraphQL', 'PostgreSQL'].map((tag) => (
                <span key={tag} className="stack-chip">
                  {tag}
                </span>
              ))}
            </div>

            <button className="hire-button" onClick={() => tuneTo(6)}>
              <span>Hire me</span>
              <span className="button-arrow">↗</span>
            </button>

            <div className="facts-footer font-tv-mono">
              <span>AVAILABLE FOR</span>
              <span>GOOD PROBLEMS</span>
            </div>
          </aside>
        </main>

        {/* TV Guide */}
        <nav className="tv-guide" aria-label="TV guide">
          <div className="guide-heading font-tv-mono">TV GUIDE</div>
          <div className="guide-scroll">
            {channels.map((channel, index) => (
              <button
                key={channel.id}
                className={`guide-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => tuneTo(index)}
                aria-label={`Tune to channel ${channel.number}, ${channel.short}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-pressed={index === activeIndex}
              >
                <span className="font-tv-mono guide-number">{channel.number}</span>
                <span>{channel.short}</span>
                {index === activeIndex && <span className="guide-live-dot" />}
              </button>
            ))}
          </div>
          <div className="guide-hint font-tv-mono">ARROW KEYS TO TUNE</div>
        </nav>

        {/* Footer */}
        <footer className="site-footer font-tv-mono">
          <span>© {new Date().getFullYear()} FAITH OTIENO</span>
          <span className="footer-rule" />
          <span>MADE IN NAIROBI / BROADCASTING WORLDWIDE</span>
        </footer>
      </div>
      </div>
    </div>
  );
}
