'use client';

import { useState } from 'react';

export default function ContactChannel() {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const lines = [
    { n: 1, label: 'Email', href: 'mailto:faithcathy12@gmail.com', primary: true },
    { n: 2, label: 'LinkedIn', href: 'https://www.linkedin.com/in/faith-catherine-otieno-92b708199/' },
    { n: 3, label: 'GitHub', href: 'https://github.com/faithkatherine' },
    { n: 4, label: 'Résumé (download)', href: '#' },
  ];

  return (
    <div className="contact-channel h-full">
      <div className="contact-split">
        {/* Phone booth */}
        <div className={`booth-wrap ${hoveredLine ? 'is-ringing' : ''}`} aria-hidden="true">
          <svg className="booth-svg" viewBox="0 0 260 380" preserveAspectRatio="xMidYMax meet">
            {/* Base */}
            <rect x="18" y="356" width="224" height="14" rx="3" className="b-ink" />

            {/* Body */}
            <rect x="24" y="30" width="212" height="330" rx="26" className="b-body" />

            {/* Roof */}
            <rect x="24" y="30" width="212" height="56" rx="26" className="b-roof" />
            <rect x="24" y="60" width="212" height="26" className="b-roof" />

            {/* Sign */}
            <rect x="56" y="42" width="148" height="30" rx="6" className="b-sign" />
            <text x="130" y="63" textAnchor="middle" className="b-sign-text">
              PHONE
            </text>

            {/* Bulbs */}
            <circle cx="40" cy="57" r="5" className="b-bulb" />
            <circle cx="220" cy="57" r="5" className="b-bulb" />

            {/* Inside */}
            <rect x="44" y="100" width="172" height="244" rx="10" className="b-inside" />

            {/* Phone */}
            <rect x="104" y="140" width="52" height="74" rx="8" className="b-phone" />
            <rect x="114" y="168" width="32" height="34" rx="4" className="b-keypad" />
            <g className="b-keys">
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <circle key={`${r}${c}`} cx={121 + c * 9} cy={175 + r * 10} r="2.4" />
                ))
              )}
            </g>
            <path
              className="b-cord"
              d="M112 208 q-8 6 0 12 q8 6 0 12 q-8 6 0 12 q8 6 0 12 q-8 6 0 12 q8 6 -2 14"
            />

            {/* Handset */}
            <g className="b-handset">
              <rect x="98" y="128" width="18" height="58" rx="9" />
              <rect x="94" y="124" width="14" height="16" rx="5" />
              <rect x="94" y="174" width="14" height="16" rx="5" />
            </g>

            {/* Shelf */}
            <rect x="60" y="240" width="140" height="10" rx="3" className="b-shelf" />
            <rect x="72" y="226" width="40" height="14" rx="2" className="b-book" />

            {/* Door - hinges on booth's right, opens outward to the right */}
            <g className="b-door">
              {/* Door frame - trapezoid showing perspective, hinge at x=44, far edge shorter */}
              <path d="M44 100 L8 116 L8 326 L44 344 Z" className="b-door-frame" />
              {/* Glass pane 1 (top) */}
              <path d="M40 116 L14 126 L14 208 L40 202 Z" className="b-glass" />
              {/* Glass pane 2 (bottom) */}
              <path d="M40 218 L14 224 L14 310 L40 320 Z" className="b-glass" />
              {/* Handle near far edge */}
              <circle cx="18" cy="218" r="3" className="b-handle" />
            </g>
          </svg>

          <div className="booth-bubble">{hoveredLine ? 'Ring ring!' : 'hello?'}</div>
        </div>

        {/* Call board */}
        <div className="call-board">
          <span className="mono contact-label">THE OPEN CHANNEL</span>
          <h2>Have a good problem?</h2>
          <p>
            I&apos;m open to full-time roles, contracts and product partnerships, especially products that make life easier for people in Kenya and beyond. I usually reply within a day or two.
          </p>

          <div className="call-lines">
            {lines.map((line) => (
              <a
                key={line.n}
                onMouseEnter={() => setHoveredLine(line.n)}
                onMouseLeave={() => setHoveredLine(null)}
                onFocus={() => setHoveredLine(line.n)}
                onBlur={() => setHoveredLine(null)}
                href={line.href}
                target={line.href.startsWith('http') ? '_blank' : undefined}
                rel={line.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`call-line ${line.primary ? 'primary' : ''} ${
                  hoveredLine === line.n ? 'lit' : ''
                }`}
              >
                <span className="line-light" />
                <span className="mono">LINE {line.n}</span>
                <span className="line-name">{line.label}</span>
                <span className="line-arrow">↗</span>
              </a>
            ))}
          </div>

          <span className="mono contact-signoff">NICE TO MEET YOU</span>
        </div>
      </div>
    </div>
  );
}
