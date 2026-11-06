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
  const [canvasLeft, setCanvasLeft] = useState(0);
  const [canvasTop, setCanvasTop] = useState(0);

  // ResizeObserver to scale the canvas with fixed height, fluid width
  useEffect(() => {
    const screenEl = screenRef.current;
    if (!screenEl) return;

    const updateScale = () => {
      // Measure the screen's inner box (clientWidth/clientHeight)
      const innerW = screenEl.clientWidth;
      const innerH = screenEl.clientHeight;

      const BASE_H = CANVAS_SIZE.height;
      const MIN_W = CANVAS_SIZE.minWidth;
      const MAX_W = CANVAS_SIZE.maxWidth;

      // Calculate scale and canvas width per user's formula
      let newScale = innerH / BASE_H;
      let canvasW = innerW / newScale;

      if (canvasW > MAX_W) {
        newScale = innerW / MAX_W;
        canvasW = MAX_W;
      } else if (canvasW < MIN_W) {
        newScale = innerW / MIN_W;
        canvasW = MIN_W;
      }

      // Round scale to 3 decimals for better font rendering
      newScale = Math.round(newScale * 1000) / 1000;

      // Calculate centered position
      const left = (innerW - canvasW * newScale) / 2;
      const top = (innerH - BASE_H * newScale) / 2;

      setScale(newScale);
      setCanvasWidth(canvasW);
      setCanvasLeft(left);
      setCanvasTop(top);
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
          className="screen-canvas"
          style={{
            position: 'absolute',
            left: `${canvasLeft}px`,
            top: `${canvasTop}px`,
            width: `${canvasWidth}px`,
            height: `${CANVAS_SIZE.height}px`,
            padding: '27px 30px 28px',
            boxSizing: 'border-box',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <ChannelContent channel={channel} onTune={onTune} />
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
