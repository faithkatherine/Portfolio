'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { experiences, tapeCodes } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

export default function ExperienceChannel() {
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [highlightPairIndex, setHighlightPairIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showTracking, setShowTracking] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);
  const trackingRef = useRef<number | null>(null);

  const role = experiences[experienceIndex];
  const totalHighlights = role.highlights.length;
  const totalPairs = Math.ceil(totalHighlights / 2);
  const currentPair = role.highlights.slice(highlightPairIndex * 2, highlightPairIndex * 2 + 2);

  // Auto-advance logic
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) {
      setProgress(0);
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);

    // Progress bar update every 40ms (4000ms / 100 steps)
    progressRef.current = window.setInterval(() => {
      setProgress(p => Math.min(p + 2.5, 100));
    }, 100);

    // Advance to next pair after 4s
    timerRef.current = window.setTimeout(() => {
      setHighlightPairIndex(prev => (prev + 1) % totalPairs);
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [highlightPairIndex, isPlaying, totalPairs, prefersReducedMotion]);

  // Reset to first pair when switching tapes and show tracking overlay
  useEffect(() => {
    setHighlightPairIndex(0);
    setIsPlaying(true);
    setProgress(0);

    // Show tracking overlay for 300ms
    if (!prefersReducedMotion) {
      setShowTracking(true);
      if (trackingRef.current) clearTimeout(trackingRef.current);
      trackingRef.current = window.setTimeout(() => {
        setShowTracking(false);
      }, 300);
    }

    return () => {
      if (trackingRef.current) clearTimeout(trackingRef.current);
    };
  }, [experienceIndex, prefersReducedMotion]);

  const handlePrevPair = () => {
    setHighlightPairIndex(prev => (prev - 1 + totalPairs) % totalPairs);
    setProgress(0);
  };

  const handleNextPair = () => {
    setHighlightPairIndex(prev => (prev + 1) % totalPairs);
    setProgress(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleStop = () => {
    setHighlightPairIndex(0);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="experience-channel h-full">
      <ChannelHeader eyebrow="04 / EXPERIENCE" title="The work reel." />
      <p className="channel-subtitle">Pull a tape from the shelf.</p>

      <div className="experience-split">
        {/* VHS shelf */}
        <div className="vhs-shelf2">
          <div className="vhs-row">
            {experiences.map((item, index) => (
              <button
                key={item.company}
                className={`vhs-tape label-${index} ${index === experienceIndex ? 'selected' : ''}`}
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

        {/* Sleeve */}
        <AnimatePresence mode="wait">
          <motion.div
            className="sleeve"
            key={role.company}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.22 }}
          >
            {showTracking && (
              <div className="vhs-tracking" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            )}

            <div className="sleeve-light">
              <div className="sleeve-top">
                <span className="vhs-logo big">VHS</span>
                <span className="mono">{tapeCodes[experienceIndex]}</span>
              </div>
              <h3>{role.company}</h3>
              <span className="sleeve-role">{role.role}</span>

              <div className="impact-box">
                <div className="impact-value">{role.impact.value}</div>
                <div className="impact-label">{role.impact.label}</div>
              </div>

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
                  <dt>TYPE</dt>
                  <dd>{role.type}</dd>
                </div>
              </dl>

              <div className="deck-buttons">
                <button onClick={handlePrevPair} aria-label="Previous highlights" title="Previous pair">◀◀</button>
                <button onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'} title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <button onClick={handleNextPair} aria-label="Next highlights" title="Next pair">▶▶</button>
                <button onClick={handleStop} aria-label="Stop and reset" title="Stop">■</button>
              </div>

              {role.link && (
                <a className="role-link" href={role.link} target="_blank" rel="noopener noreferrer">
                  VISIT PURSUIT HQ ↗
                </a>
              )}
            </div>

            <div className="sleeve-stripes" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>

            <div
              className="sleeve-dark"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
              onFocus={() => setIsPlaying(false)}
              onBlur={() => setIsPlaying(true)}
            >
              <div className="cassette" aria-hidden="true">
                <span className="cassette-label">{role.company.toUpperCase()}</span>
                <span className="cassette-window">
                  <i />
                  <i />
                </span>
              </div>

              <p className="tape-one-liner">{role.oneLiner}</p>

              <div className="highlights-header">
                <span className="mono highlights-label">HIGHLIGHTS {highlightPairIndex * 2 + 1}–{Math.min(highlightPairIndex * 2 + 2, totalHighlights)} / {totalHighlights}</span>
                <div className="highlights-progress">
                  <div className="highlights-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={highlightPairIndex}
                  className="highlights-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentPair.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </motion.ul>
              </AnimatePresence>

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
