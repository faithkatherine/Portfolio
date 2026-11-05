'use client';

import { useEffect, useRef, useState } from 'react';
import { CANVAS_SIZE, channels } from '@/data/tv-content';
import HelloChannel from './channels/HelloChannel';
import ThinkChannel from './channels/ThinkChannel';
import BlocksChannel from './channels/BlocksChannel';
import ExperienceChannel from './channels/ExperienceChannel';
import ProjectsChannel from './channels/ProjectsChannel';
import OffClockChannel from './channels/OffClockChannel';
import ContactChannel from './channels/ContactChannel';

export default function ScrollableChannels() {
  const [activeId, setActiveId] = useState('hello');
  const [scale, setScale] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState<number>(CANVAS_SIZE.minWidth);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Detect mobile vs tablet
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 760);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate canvas scaling for tablet (760-1023px)
  useEffect(() => {
    if (isMobile) {
      setScale(1);
      setCanvasWidth(CANVAS_SIZE.minWidth);
      return;
    }

    const updateScale = () => {
      const viewportHeight = window.innerHeight;
      const newScale = viewportHeight / CANVAS_SIZE.height;
      const calculatedWidth = window.innerWidth / newScale;
      const clampedWidth = Math.max(
        CANVAS_SIZE.minWidth,
        Math.min(CANVAS_SIZE.maxWidth, calculatedWidth)
      );
      setScale(newScale);
      setCanvasWidth(clampedWidth);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isMobile]);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionsRef.current.forEach((section, id) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToChannel = (id: string) => {
    const section = sectionsRef.current.get(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setSectionRef = (id: string, el: HTMLElement | null) => {
    if (el) {
      sectionsRef.current.set(id, el);
    } else {
      sectionsRef.current.delete(id);
    }
  };

  return (
    <div className="scroll-mode">
      {/* Sticky channel bar */}
      <div className="scroll-channel-bar">
        <div className="flex items-center gap-3">
          <span className="wordmark-dot" />
          <span className="font-tv-display text-[13px] font-bold tracking-[0.17em]">FAITH OT.</span>
        </div>
        <div className="scroll-channel-tabs">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className={`scroll-tab ${activeId === channel.id ? 'active' : ''}`}
              onClick={() => scrollToChannel(channel.id)}
            >
              <span className="font-tv-mono">{channel.number}</span>
              <span className="scroll-tab-label">{channel.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable channel sections */}
      <div className="scroll-sections">
        {/* CH 01 - Hello */}
        <section
          ref={(el) => setSectionRef('hello', el)}
          className="scroll-section"
          data-channel="01"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 01 / HELLO</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <HelloChannel onTune={(index) => scrollToChannel(channels[index].id)} />
            </div>
          </div>
        </section>

        {/* Context section (after Hello on mobile/tablet) */}
        <section ref={(el) => setSectionRef('context', el)} className="scroll-section context-section">
          <div className="scroll-context">
            <h1 className="scroll-context-heading">
              Engineer by trade.
              <br />
              <em className="text-tv-orange font-normal">Builder by instinct.</em>
            </h1>
            <p className="scroll-context-body">
              3+ years · Nairobi · remote with UK and global teams. I like turning fuzzy problems into
              clear, useful products.
            </p>
            <div className="scroll-stack-list">
              {['React', 'React Native', 'TypeScript', 'Django', 'GraphQL', 'PostgreSQL'].map((tag) => (
                <span key={tag} className="scroll-stack-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CH 02 - Think */}
        <section
          ref={(el) => setSectionRef('think', el)}
          className="scroll-section"
          data-channel="02"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 02 / THINK</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <ThinkChannel />
            </div>
          </div>
        </section>

        {/* CH 03 - Blocks */}
        <section
          ref={(el) => setSectionRef('blocks', el)}
          className="scroll-section"
          data-channel="03"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 03 / BLOCKS</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <BlocksChannel />
            </div>
          </div>
        </section>

        {/* CH 04 - Experience */}
        <section
          ref={(el) => setSectionRef('experience', el)}
          className="scroll-section"
          data-channel="04"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 04 / EXPERIENCE</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <ExperienceChannel />
            </div>
          </div>
        </section>

        {/* CH 05 - Projects */}
        <section
          ref={(el) => setSectionRef('projects', el)}
          className="scroll-section"
          data-channel="05"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 05 / PROJECTS</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <ProjectsChannel />
            </div>
          </div>
        </section>

        {/* CH 06 - Off Clock */}
        <section
          ref={(el) => setSectionRef('offclock', el)}
          className="scroll-section"
          data-channel="06"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 06 / OFF CLOCK</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <OffClockChannel />
            </div>
          </div>
        </section>

        {/* CH 07 - Contact */}
        <section
          ref={(el) => setSectionRef('contact', el)}
          className="scroll-section"
          data-channel="07"
        >
          <div className="section-bezel">
            <span className="font-tv-mono section-label">CH 07 / CONTACT</span>
          </div>
          <div className="section-canvas-wrapper" style={isMobile ? {} : { height: '600px' }}>
            <div
              className="section-canvas"
              style={
                isMobile
                  ? {}
                  : {
                      width: `${canvasWidth}px`,
                      height: `${CANVAS_SIZE.height}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top center',
                    }
              }
            >
              <ContactChannel />
            </div>
          </div>
        </section>
      </div>

      {/* Optional remote control (tablet only) */}
      {!isMobile && (
        <div className="scroll-remote">
          <button
            className="remote-btn remote-up"
            onClick={() => {
              const currentIdx = channels.findIndex((ch) => ch.id === activeId);
              if (currentIdx > 0) scrollToChannel(channels[currentIdx - 1].id);
            }}
            aria-label="Previous channel"
          >
            ▲
          </button>
          <button
            className="remote-btn remote-down"
            onClick={() => {
              const currentIdx = channels.findIndex((ch) => ch.id === activeId);
              if (currentIdx < channels.length - 1) scrollToChannel(channels[currentIdx + 1].id);
            }}
            aria-label="Next channel"
          >
            ▼
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="scroll-footer font-tv-mono">
        <span>© {new Date().getFullYear()} FAITH OTIENO</span>
        <span>FULL-STACK ENGINEER</span>
      </footer>
    </div>
  );
}
