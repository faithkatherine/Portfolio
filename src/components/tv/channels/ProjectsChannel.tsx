'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

export default function ProjectsChannel() {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [trackPairIndex, setTrackPairIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);

  const projectIndex = Math.max(0, projects.findIndex((item) => item.id === projectId));
  const project = projects[projectIndex];
  const totalTracks = project.tracks.length;
  const totalPairs = Math.ceil(totalTracks / 2);
  const currentPair = project.tracks.slice(trackPairIndex * 2, trackPairIndex * 2 + 2);

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
      setTrackPairIndex(prev => (prev + 1) % totalPairs);
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [trackPairIndex, isPlaying, totalPairs, prefersReducedMotion]);

  // Reset to first pair when switching projects
  useEffect(() => {
    setTrackPairIndex(0);
    setIsPlaying(true);
    setProgress(0);
  }, [projectId]);

  const handlePrevPair = () => {
    setTrackPairIndex(prev => (prev - 1 + totalPairs) % totalPairs);
    setProgress(0);
  };

  const handleNextPair = () => {
    setTrackPairIndex(prev => (prev + 1) % totalPairs);
    setProgress(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="projects-channel h-full">
      <ChannelHeader eyebrow="05 / PROJECTS" title="Things I've made." />

      <div className="projects-split">
        {/* CD rack */}
        <div className="cd-rack2" role="tablist" aria-label="Projects">
          <span className="mono rack-label">RACK / 06</span>
          <div className="cd-rack-row">
            {projects.map((item, index) => (
              <button
                key={item.id}
                className={`cd-case-spine spine-${index} ${item.id === projectId ? 'selected' : ''}`}
                role="tab"
                aria-selected={item.id === projectId}
                onClick={() => setProjectId(item.id)}
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

                <div
                  className="jewel-tracks"
                  onMouseEnter={() => setIsPlaying(false)}
                  onMouseLeave={() => setIsPlaying(true)}
                  onFocus={() => setIsPlaying(false)}
                  onBlur={() => setIsPlaying(true)}
                >
                  <div className="tracks-header">
                    <span className="mono tracklist-label">TRACK {trackPairIndex * 2 + 1}–{Math.min(trackPairIndex * 2 + 2, totalTracks)} / {totalTracks}</span>
                    <div className="tracks-progress">
                      <div className="tracks-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.ol
                      key={trackPairIndex}
                      className="tracks-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentPair.map((track, idx) => (
                        <li key={idx}>
                          <span className="mono">{String(trackPairIndex * 2 + idx + 1).padStart(2, '0')}</span>
                          {track}
                        </li>
                      ))}
                    </motion.ol>
                  </AnimatePresence>

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
              <button onClick={handlePrevPair} className="control-btn" aria-label="Previous tracks" title="Previous">◀◀</button>
              <button onClick={handlePlayPause} className="control-btn" aria-label={isPlaying ? 'Pause' : 'Play'} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <button onClick={handleNextPair} className="control-btn" aria-label="Next tracks" title="Next">▶▶</button>
              {project.link && (
                <a className="view-project-link" href={project.link} target="_blank" rel="noopener noreferrer">
                  View project ↗
                </a>
              )}
              <div className="progress-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
