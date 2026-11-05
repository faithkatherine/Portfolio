'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CANVAS_SIZE, type Channel } from '@/data/tv-content';
import HelloChannel from './channels/HelloChannel';
import ThinkChannel from './channels/ThinkChannel';
import BlocksChannel from './channels/BlocksChannel';
import ExperienceChannel from './channels/ExperienceChannel';
import ProjectsChannel from './channels/ProjectsChannel';
import OffClockChannel from './channels/OffClockChannel';
import ContactChannel from './channels/ContactChannel';

type ChannelScreenProps = {
  channel: Channel;
  isTuning: boolean;
  isPowered: boolean;
  onTune: (index: number) => void;
};

export default function ChannelScreen({ channel, isTuning, isPowered, onTune }: ChannelScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState<number>(CANVAS_SIZE.minWidth);

  // ResizeObserver to scale the canvas with fixed height, fluid width
  useEffect(() => {
    const screenEl = screenRef.current;
    if (!screenEl) return;

    const updateScale = () => {
      // Measure the screen's inner box (accounting for padding, border, etc.)
      const rect = screenEl.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(screenEl);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      const availableWidth = rect.width - paddingLeft - paddingRight;
      const availableHeight = rect.height - paddingTop - paddingBottom;

      // Fixed height 600px, calculate scale from height
      const newScale = availableHeight / CANVAS_SIZE.height;

      // Calculate fluid width: screenWidth / scale, clamped between min and max
      const calculatedWidth = availableWidth / newScale;
      const clampedWidth = Math.max(
        CANVAS_SIZE.minWidth,
        Math.min(CANVAS_SIZE.maxWidth, calculatedWidth)
      );

      setScale(newScale);
      setCanvasWidth(clampedWidth);
    };

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(screenEl);
    updateScale();

    return () => resizeObserver.disconnect();
  }, []);

  const getTintClasses = (tint: string) => {
    switch (tint) {
      case 'blue': return 'bg-tv-cornflower';
      case 'indigo': return 'bg-tv-indigo';
      case 'lilac': return 'bg-[#9a80bf]';
      case 'pink': return 'bg-[#cc88a8]';
      default: return 'bg-tv-cornflower';
    }
  };

  return (
    <div
      ref={screenRef}
      className={`tv-screen relative isolate w-full min-h-[500px] overflow-hidden transition-colors duration-250 ${getTintClasses(channel.tint)} ${isTuning ? 'is-tuning' : ''}`}
    >
      {/* Screen decorations */}
      <div className="screen-scanlines" />
      <div className="screen-glare" />
      <div className="screen-corner screen-corner-tl" />
      <div className="screen-corner screen-corner-br" />

      {/* Static/tuning effects */}
      <AnimatePresence>
        {!isPowered && (
          <motion.div
            className="power-line"
            initial={{ scaleY: 0.01 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
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
              className="static-channel-code font-tv-mono"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            >
              CH {channel.number}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Signal indicator */}
      {isPowered && (
        <div className="screen-signal font-tv-mono" aria-live="polite">
          CH {channel.number} / {channel.title}
        </div>
      )}

      {/* Scaled canvas content */}
      {isPowered && (
        <div
          ref={canvasRef}
          className="screen-canvas-wrapper"
          style={{
            position: 'absolute',
            top: '31px',
            left: '34px',
            right: '34px',
            bottom: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            className="screen-canvas"
            style={{
              width: `${canvasWidth}px`,
              height: `${CANVAS_SIZE.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <ChannelContent channel={channel} onTune={onTune} />
          </div>
        </div>
      )}
    </div>
  );
}

function ChannelContent({ channel, onTune }: { channel: Channel; onTune?: (index: number) => void }) {
  switch (channel.id) {
    case 'hello': return <HelloChannel onTune={onTune} />;
    case 'think': return <ThinkChannel />;
    case 'blocks': return <BlocksChannel />;
    case 'experience': return <ExperienceChannel />;
    case 'projects': return <ProjectsChannel />;
    case 'offclock': return <OffClockChannel />;
    case 'contact': return <ContactChannel />;
    default: return null;
  }
}
