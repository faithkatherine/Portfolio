'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { blocks, tetrisPieces } from '@/data/tv-content';
import ChannelHeader from '../ChannelHeader';

export default function BlocksChannel() {
  const [selected, setSelected] = useState(0);
  const [builtCount, setBuiltCount] = useState(0);
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  const done = builtCount >= blocks.length;

  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(() => {
      setSelected(builtCount);
      setBuiltCount((count) => count + 1);
    }, reduced ? 0 : builtCount === 0 ? 450 : 760);
    return () => window.clearTimeout(timer);
  }, [builtCount, done, reduced]);

  const rebuild = () => {
    setBuiltCount(0);
    setSelected(0);
    setRun((r) => r + 1);
  };

  const dropping = !done && builtCount > 0 ? builtCount - 1 : -1;
  const activeIndex = Math.max(0, Math.min(builtCount - 1, blocks.length - 1));

  const trolleyCol = (() => {
    const piece = tetrisPieces[done ? blocks.length - 1 : activeIndex];
    const xs = piece.cells.map(([c]) => c);
    return (Math.min(...xs) + Math.max(...xs) + 1) / 2;
  })();

  const block = blocks[selected];

  return (
    <div className="blocks-channel h-full">
      <ChannelHeader eyebrow="03 / THE STACK" title="Building blocks." />
      <p className="blocks-subtitle">Every product is the same stack of decisions. The tools change; the decisions don&apos;t.</p>

      <div className="blocks-layout" key={run}>
        {/* Construction scene */}
        <div className="site-scene">
          <span className="cloud cloud-a" />
          <span className="cloud cloud-b" />
          <span className="cloud cloud-c" />

          {/* Crane */}
          <div className="crane" aria-hidden="true">
            <span className="crane-mast" />
            <span className="crane-cab" />
            <span className="crane-jib" />
            <span className="crane-counter" />
            <span className="crane-weight" />
            <span className="crane-tie" />
          </div>

          {/* Wall zone */}
          <div className="wall-zone">
            <motion.span
              className="crane-trolley"
              aria-hidden="true"
              animate={{ left: `calc(var(--cell) * ${trolleyCol} - 11px)` }}
              transition={{ duration: reduced ? 0 : 0.35, ease: 'easeInOut' }}
            />

            <div className={`tetris-wall ${done ? 'is-done' : ''}`}>
              {tetrisPieces.map((piece, index) => {
                const xs = piece.cells.map(([c]) => c);
                const ys = piece.cells.map(([, r]) => r);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                const minY = Math.min(...ys);
                const maxY = Math.max(...ys);
                const built = index < builtCount;

                return (
                  <motion.button
                    key={index}
                    className={`tpiece ${selected === index && built ? 'selected' : ''}`}
                    style={{
                      left: `calc(var(--cell) * ${minX})`,
                      bottom: `calc(var(--cell) * ${minY})`,
                      width: `calc(var(--cell) * ${maxX - minX + 1})`,
                      height: `calc(var(--cell) * ${maxY - minY + 1})`,
                      zIndex: selected === index ? 5 : 2,
                    }}
                    initial={false}
                    animate={built ? { y: 0, opacity: 1 } : { y: -230, opacity: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 260, damping: 19, mass: 0.9 }
                    }
                    onClick={() => built && setSelected(index)}
                    aria-label={`Show layer ${blocks[index].code}: ${blocks[index].name}`}
                    disabled={!built}
                  >
                    {dropping === index && <span className="tpiece-cable" aria-hidden="true" />}
                    {piece.cells.map(([c, r], cellIndex) => (
                      <span
                        key={cellIndex}
                        className="tcell"
                        style={{
                          left: `calc(var(--cell) * ${c - minX})`,
                          bottom: `calc(var(--cell) * ${r - minY})`,
                          background: piece.color,
                        }}
                      >
                        {cellIndex === 0 && <em className="mono">{blocks[index].code}</em>}
                      </span>
                    ))}
                  </motion.button>
                );
              })}

              {done && (
                <motion.div
                  className="wall-browser"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  aria-hidden="true"
                >
                  <span className="wall-browser-bar">
                    <i />
                    <i />
                    <i />
                  </span>
                </motion.div>
              )}
            </div>

            <span className={`mono product-label ${done ? 'show' : ''}`}>= A PRODUCT.</span>
          </div>

          {/* Dozer */}
          <motion.div
            className="dozer"
            aria-hidden="true"
            animate={{ x: done ? 0 : [0, 14, 0] }}
            transition={{
              duration: 0.7,
              repeat: done || reduced ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="dozer-cab" />
            <span className="dozer-body" />
            <span className="dozer-blade" />
            <span className="dozer-track">
              <i />
              <i />
              <i />
              <i />
            </span>
          </motion.div>

          {/* Ground */}
          <div className="ground">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Site plan */}
        <div className="site-plan">
          <div className="site-plan-clip mono">SITE PLAN</div>
          <div className="site-plan-body">
            <span className="mono">LAYER {block.code} / 05</span>
            <h3>{block.headline}</h3>
            <span className="mono plan-name">{block.name.toUpperCase()}</span>
            <p>{block.text}</p>

            <div className="plan-section">
              <span className="mono plan-section-label">TOOLS I&apos;VE USED HERE</span>
              <div className="plan-chips">
                {block.reachFor.map((item, idx) => {
                  const parts = item.split(' / ');
                  return (
                    <span key={idx} className="plan-chip">
                      {parts.map((part, i) => (
                        <span key={i}>
                          {part}
                          {i < parts.length - 1 && <span className="chip-sep"> / </span>}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="plan-section">
              <span className="mono plan-section-label">IT HOLDS UP</span>
              <p className="plan-holds-up">{block.holdsUp}</p>
            </div>

            <div className="plan-progress" aria-label={`${builtCount} of 5 layers built`}>
              {blocks.map((b, i) => (
                <button
                  key={b.code}
                  className={`${i < builtCount ? 'built' : ''} ${i === selected ? 'current' : ''}`}
                  onClick={() => i < builtCount && setSelected(i)}
                  aria-label={`Layer ${b.code}`}
                >
                  {b.code}
                </button>
              ))}
            </div>

            <div className="plan-actions">
              <span className="mono block-hint">{done ? 'All five layers built. Different tools every time; the same layers every time.' : 'BUILDING…'}</span>
              <button className="rebuild-button" onClick={rebuild}>
                ↻ Rebuild
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
