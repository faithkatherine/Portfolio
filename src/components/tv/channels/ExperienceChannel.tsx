'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, tapeCodes } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

export default function ExperienceChannel() {
  const [experienceIndex, setExperienceIndex] = useState(0);
  const role = experiences[experienceIndex];
  const [oneLiner, ...highlights] = role.bullets;

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
                  <dd>{String(experienceIndex + 1).padStart(2, '0')} / 06</dd>
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
                <span className="cassette-label">{role.company.toUpperCase()}</span>
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
