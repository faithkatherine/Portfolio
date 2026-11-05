'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { opinions } from '@/data/tv-content';

export default function ThinkChannel() {
  const [opinionIndex, setOpinionIndex] = useState(0);
  const opinion = opinions[opinionIndex];

  return (
    <div className="think-split">
      {/* Folder drawer */}
      <div className="folder-drawer" aria-label="How I think folders">
        <span className="drawer-label">FIELD NOTES / 07</span>
        <div className="shelf-files">
          {opinions.map((item, index) => (
            <button
              key={item.topic}
              className={`think-folder folder-${index} ${index === opinionIndex ? 'selected' : ''}`}
              onClick={() => setOpinionIndex(index)}
              aria-pressed={index === opinionIndex}
            >
              <span className="folder-tab">{String(index + 1).padStart(2, '0')}</span>
              <span className="folder-spine-label">
                <b>{String(index + 1).padStart(2, '0')}</b> {item.topic}
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

      {/* Field sheet */}
      <motion.div
        key={opinionIndex}
        className="field-sheet"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.22 }}
        role="region"
        aria-live="polite"
        aria-label={`${opinion.topic} engineering principle`}
      >
        <span className="paperclip" />
        <span className="field-label">{String(opinionIndex + 1).padStart(2, '0')} {opinion.topic.toUpperCase()}</span>
        <blockquote>&quot;{opinion.quote}&quot;</blockquote>
        <p>{opinion.body}</p>

        <div className="practice-block">
          <span>IN PRACTICE</span>
          <ul>
            {opinion.practice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="tag-box">
          {opinion.tags.map((tag) => (
            <span key={tag} className="screen-tag">{tag}</span>
          ))}
        </div>

        <div className="field-sheet-footer">
          <div className="arrow-pair">
            <button
              onClick={() => setOpinionIndex((opinionIndex - 1 + opinions.length) % opinions.length)}
              aria-label="Previous principle"
            >
              ←
            </button>
            <button
              onClick={() => setOpinionIndex((opinionIndex + 1) % opinions.length)}
              aria-label="Next principle"
            >
              →
            </button>
          </div>
          <span className="faith-signoff">— Faith</span>
          <span className="sheet-count">{String(opinionIndex + 1).padStart(2, '0')} / 07</span>
        </div>

        <div className="field-note-stamp">FIELD NOTE</div>
      </motion.div>
    </div>
  );
}
