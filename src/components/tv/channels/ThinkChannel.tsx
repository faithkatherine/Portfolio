"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { opinions } from "@/data/tv-content";

export default function ThinkChannel() {
  const [opinionIndex, setOpinionIndex] = useState(0);
  const opinion = opinions[opinionIndex];

  return (
    <div className="think-channel think-split">
      {/* Folder drawer */}
      <div className="folder-drawer" aria-label="How I think folders">
        <span className="mono drawer-label">FIELD NOTES / 08</span>
        <div className="shelf-files">
          {opinions.map((item, index) => (
            <button
              key={item.topic}
              className={`think-folder folder-${index} ${index === opinionIndex ? "selected" : ""}`}
              onClick={() => setOpinionIndex(index)}
              aria-pressed={index === opinionIndex}
            >
              <span className="folder-tab">
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

      {/* Field sheet */}
      <motion.div
        key={opinionIndex}
        className="field-sheet playbook-sheet"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.22 }}
        role="region"
        aria-live="polite"
        aria-label={`${opinion.topic} playbook`}
      >
        <span className="paperclip" />
        <span className="mono playbook-eyebrow">
          PLAYBOOK {String(opinionIndex + 1).padStart(2, "0")} / 08 ·{" "}
          {opinion.topic.toUpperCase()}
        </span>
        <h2 className="playbook-headline">{opinion.quote}</h2>

        <div className="playbook-section">
          <span className="mono playbook-section-label">THE PROBLEM</span>
          <p className="playbook-problem">{opinion.problem}</p>
        </div>

        <div className="playbook-section">
          <span className="mono playbook-section-label">MY APPROACH</span>
          <ol className="playbook-approach">
            {opinion.approach.map((step, idx) => (
              <li key={idx}>
                <span className="mono approach-number">{idx + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="playbook-boxes">
          <div className="playbook-box">
            <span className="mono playbook-box-label">WATCH FOR</span>
            <p>{opinion.watchFor}</p>
          </div>
          <div className="playbook-box">
            <span className="mono playbook-box-label">
              WHERE I&apos;VE DONE IT
            </span>
            <p>{opinion.whereUsed}</p>
          </div>
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
              aria-label="Previous playbook"
            >
              ←
            </button>
            <button
              onClick={() =>
                setOpinionIndex((opinionIndex + 1) % opinions.length)
              }
              aria-label="Next playbook"
            >
              →
            </button>
          </div>
          <span className="faith-signoff">— Faith</span>
          <span className="mono sheet-count">
            {String(opinionIndex + 1).padStart(2, "0")} / 08
          </span>
        </div>

        <div className="field-note-stamp">FIELD NOTE</div>
      </motion.div>
    </div>
  );
}
