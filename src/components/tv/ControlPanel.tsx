'use client';

import type { Channel } from '@/data/tv-content';

type ControlPanelProps = {
  channel: Channel;
  isPowered: boolean;
  onDialClick: () => void;
  onStep: (step: number) => void;
};

export default function ControlPanel({ channel, isPowered, onDialClick, onStep }: ControlPanelProps) {
  const dialAngle = Number(channel.number) * 40 - 40;

  return (
    <div className="control-panel">
      <div className="control-brand">
        <span className="control-brand-mark">F</span>
        <span className="font-tv-mono">FAITH / TV</span>
      </div>

      <div className="control-row">
        <div className="dial-wrap">
          <button
            className={`dial ${isPowered ? 'dial-ready' : ''}`}
            style={{ '--dial-angle': `${dialAngle}deg` } as React.CSSProperties}
            onClick={onDialClick}
            aria-label="Turn channel dial. Click for next channel."
            title="Click for next channel"
          >
            <span className="dial-notch" />
            <span className="dial-center" />
          </button>
          <span className="font-tv-mono dial-label">CHANNEL</span>
        </div>

        <div className="channel-buttons">
          <button className="channel-button" onClick={() => onStep(1)} aria-label="Next channel">
            <span>CH</span>
            <strong>+</strong>
          </button>
          <button className="channel-button" onClick={() => onStep(-1)} aria-label="Previous channel">
            <span>CH</span>
            <strong>−</strong>
          </button>
        </div>
      </div>

      <div className="speaker" aria-label="Speaker grille">
        {Array.from({ length: 30 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="control-bottom">
        <span className={`power-led ${isPowered ? 'on' : ''}`} />
        <span className="font-tv-mono">POWER / {isPowered ? 'ON' : 'BOOTING'}</span>
        <span className="control-frequency font-tv-mono">000.07 FM</span>
      </div>
    </div>
  );
}
