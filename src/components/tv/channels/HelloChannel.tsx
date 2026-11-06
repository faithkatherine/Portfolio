'use client';

type HelloChannelProps = {
  onTune?: (index: number) => void;
};

export default function HelloChannel({ onTune }: HelloChannelProps) {
  const ticker = 'NAIROBI, KENYA · REACT · REACT NATIVE · TYPESCRIPT · PYTHON · DJANGO · GRAPHQL · POSTGRESQL · AWS · BEDROCK AGENTCORE · REMOTE WITH UK & GLOBAL TEAMS · NOW BUILDING PURSUIT · ';

  return (
    <div className="hello-channel hello-windows">
      {/* Main window */}
      <div className="retro-window hello-window-main">
        <div className="retro-window-bar">
          <span>faith_otieno.exe</span>
          <span className="window-dots">— □ ×</span>
        </div>
        <div className="retro-window-body hello-main-body">
          <span className="mono channel-eyebrow">01 / HELLO</span>
          <h2>Hello, I&apos;m Faith.</h2>
          <p className="hello-lede">Full-stack engineer with 3+ years shipping production web, mobile and AI features end to end, from system design and data modelling to deployment and monitoring. Most recently at a UK digital health platform; now building Pursuit and multi-agent systems on AWS.</p>

          <div className="hello-creds mono">
            <span>PREVIOUSLY</span>
            <b>Software Engineer · Walking on Earth (UK)</b>
            <span>NOW</span>
            <b>Founder · Pursuit HQ</b>
          </div>

          <div className="hello-shortcuts">
            <span className="mono shortcut-label">JUMP TO A CHANNEL</span>
            <div>
              <button onClick={() => onTune?.(1)}><b>02</b> How I think</button>
              <button onClick={() => onTune?.(2)}><b>03</b> Building blocks</button>
              <button onClick={() => onTune?.(3)}><b>04</b> Experience</button>
              <button onClick={() => onTune?.(4)}><b>05</b> Projects</button>
              <button onClick={() => onTune?.(6)}><b>07</b> Contact</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats window */}
      <div className="retro-window hello-window-stats">
        <div className="retro-window-bar">
          <span>stats</span>
          <span className="window-dots">□ ×</span>
        </div>
        <div className="hello-stat-tiles">
          <div className="hello-stat-tile">
            <strong>3+ yrs</strong>
            <span>shipping to production</span>
          </div>
          <div className="hello-stat-tile">
            <strong>500+</strong>
            <span>app downloads driven</span>
          </div>
          <div className="hello-stat-tile">
            <strong>1 app</strong>
            <span>built solo: Pursuit</span>
          </div>
        </div>
      </div>

      {/* README window */}
      <div className="retro-window hello-window-readme">
        <div className="retro-window-bar">
          <span>read_me.txt</span>
          <span className="window-dots">□ ×</span>
        </div>
        <div className="hello-readme-body">
          <dl>
            <div>
              <dt className="mono">STATUS</dt>
              <dd>Open to: full-time · contract · partnerships</dd>
            </div>
            <div>
              <dt className="mono">BASED</dt>
              <dd>Nairobi, Kenya · remote with UK &amp; global teams</dd>
            </div>
            <div>
              <dt className="mono">CURRENTLY</dt>
              <dd>Building Pursuit · agentic AI on AWS · studying for AWS Data Engineer</dd>
            </div>
            <div>
              <dt className="mono">FOCUS</dt>
              <dd>Web · mobile · backend · data · AI agents</dd>
            </div>
          </dl>
          <button>Don&apos;t forget the résumé ↓</button>
        </div>
      </div>

      {/* Ticker */}
      <div className="hello-ticker mono" aria-label={ticker}>
        <div className="ticker-track" aria-hidden="true">
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>
    </div>
  );
}
