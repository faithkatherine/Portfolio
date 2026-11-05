'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

export default function ProjectsChannel() {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [playing, setPlaying] = useState(false);
  const projectIndex = Math.max(0, projects.findIndex((item) => item.id === projectId));
  const project = projects[projectIndex];

  return (
    <div className="projects-channel h-full">
      <ChannelHeader eyebrow="05 / PROJECTS" title="Things I've made." />

      <div className="projects-split">
        {/* CD rack */}
        <div className="cd-rack2" role="tablist" aria-label="Projects">
          <span className="mono rack-label">RACK / 04</span>
          <div className="cd-rack-row">
            {projects.map((item, index) => (
              <button
                key={item.id}
                className={`cd-case-spine spine-${index} ${item.id === projectId ? 'selected' : ''}`}
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

        {/* Jewel case */}
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
                <span>{project.title.toUpperCase()} · {project.status}</span>
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
                        <span className="mono">{String(i + 1).padStart(2, '0')}</span>
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
              <a className="play-button" href="#contact" aria-label={`Play ${project.title}`}>
                ▶
              </a>
              <button
                className="mute-button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? 'Mute' : 'Unmute'}
              >
                {playing ? '♪' : '×'}
              </button>
              <div className="progress-bar">
                <span style={{ width: playing ? '68%' : '18%' }} />
              </div>
              <span className="mono track-time">{playing ? '02:41' : '00:37'} / 03:58</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
