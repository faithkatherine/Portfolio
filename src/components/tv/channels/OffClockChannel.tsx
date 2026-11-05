'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { interests } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

function HobbyIcon({ label }: { label: string }) {
  switch (label) {
    case 'Chess':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M22 54h22l-3-8H25zM26 46h14c0-6 4-9 4-16 0-9-7-16-15-16-3 0-5 1-6 3l2 4-6 6 3 4 7-3c0 7-3 12-3 18z" />
          <circle cx="33" cy="22" r="2" className="eye" />
        </svg>
      );
    case 'Swimming':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4 6 4 6 4v8H6z" />
          <circle cx="22" cy="22" r="7" />
          <circle cx="42" cy="22" r="7" />
          <path d="M29 22h6" className="line" />
        </svg>
      );
    case 'Baking':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M10 34h44l-5 20H15z" />
          <path d="M14 34c0-10 8-16 18-16s18 6 18 16z" className="top" />
          <path d="M24 26v4M32 24v4M40 26v4" className="line" />
        </svg>
      );
    case 'Fiction':
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
          <ellipse cx="32" cy="32" rx="26" ry="9" transform="rotate(60 32 32)" className="line" />
          <ellipse cx="32" cy="32" rx="26" ry="9" transform="rotate(120 32 32)" className="line" />
          <circle cx="32" cy="32" r="5" />
        </svg>
      );
  }
}

export default function OffClockChannel() {
  const [activePoster, setActivePoster] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActivePoster((index) => (index + 1) % interests.length),
      5000
    );
    return () => window.clearInterval(timer);
  }, []);

  const posters = [0, 1, 2].map((offset) => ({
    interest: interests[(activePoster + offset) % interests.length],
    number: (activePoster + offset) % interests.length,
  }));

  return (
    <div className="offclock-channel h-full">
      <ChannelHeader eyebrow="06 / OFF THE CLOCK" title="Curiosity has many outlets." />
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
              <span className="poster-sticker">NO. {String(number + 1).padStart(2, '0')}</span>
              <span className="poster-icon">
                <HobbyIcon label={interest.label} />
              </span>
              <strong>
                {interest.label.split(' ').map((word) => (
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
