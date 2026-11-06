// Canvas: fixed height 640px, fluid width (clamped 960-1100px)
export const CANVAS_SIZE = {
  height: 640,
  minWidth: 960,
  maxWidth: 1100,
} as const;

export type Channel = {
  id: string;
  number: string;
  short: string;
  title: string;
  tint: string;
  signalText: string;
};

export type Opinion = {
  topic: string;
  quote: string;
  problem: string;
  approach: string[];
  watchFor: string;
  whereUsed: string;
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  date: string;
  location: string;
  type: string;
  impact: { value: string; label: string };
  oneLiner: string;
  highlights: string[];
  tags: string[];
  link?: string;
};

export type Project = {
  id: string;
  label: string;
  status: string;
  kicker: string;
  title: string;
  body: string;
  tracks: string[];
  tags: string[];
  link?: string;
};

export type Interest = {
  label: string;
  note: string;
  glyph: string;
};

export type Block = {
  name: string;
  code: string;
  headline: string;
  text: string;
  reachFor: string[];
  holdsUp: string;
  shape: string;
};

export const channels: Channel[] = [
  { id: 'hello', number: '01', short: 'Hello', title: 'HELLO', tint: 'blue', signalText: 'Products from the data model to the screen in your hand.' },
  { id: 'think', number: '02', short: 'How I think', title: 'HOW I THINK', tint: 'indigo', signalText: 'Eight problems every product hits, and how I solve them.' },
  { id: 'blocks', number: '03', short: 'Building blocks', title: 'BUILDING BLOCKS', tint: 'lilac', signalText: 'The layers every product stands on.' },
  { id: 'experience', number: '04', short: 'Experience', title: 'EXPERIENCE', tint: 'pink', signalText: 'Four companies, one habit: own it end to end.' },
  { id: 'projects', number: '05', short: 'Projects', title: 'PROJECTS', tint: 'blue', signalText: 'Shipped, tested and still building.' },
  { id: 'offclock', number: '06', short: 'Off the clock', title: 'OFF THE CLOCK', tint: 'indigo', signalText: 'Curiosity is part of the toolkit.' },
  { id: 'contact', number: '07', short: 'Contact', title: 'CONTACT', tint: 'lilac', signalText: 'The line is open.' }
];

export const opinions: Opinion[] = [
  {
    topic: 'APIs',
    quote: 'How do I build an API other clients depend on?',
    problem: 'Every client breaks when the contract changes underneath it.',
    approach: [
      'Design from the client\'s screens and use cases, not the database tables',
      'Agree on conventions once: errors, auth, pagination and naming',
      'Evolve without breaking: add first, deprecate loudly, remove last'
    ],
    watchFor: 'Over-fetching vs. too many round-trips. GraphQL helps, but only with sensible resolvers.',
    whereUsed: "One GraphQL API serving Pursuit's iOS and web apps; Jira and Slack integrations at Walking on Earth.",
    tags: ['GraphQL', 'Apollo', 'Django', 'REST']
  },
  {
    topic: 'Payments',
    quote: 'How do I take money without ever charging twice?',
    problem: 'Networks retry, callbacks arrive twice or out of order, and users tap "Pay" again.',
    approach: [
      'Give every payment an idempotency key and record it first',
      'Lock the row in a transaction before changing its state',
      'Treat the provider\'s callback as the source of truth, then reconcile'
    ],
    watchFor: 'Locks that are held too long. Keep the transaction small and do slow work outside it.',
    whereUsed: 'M-Pesa STK Push in Pursuit, with Postgres transactions, SELECT FOR UPDATE and Redis idempotency.',
    tags: ['M-Pesa Daraja', 'PostgreSQL', 'Redis']
  },
  {
    topic: 'Offline',
    quote: 'How do I build for patchy networks?',
    problem: 'In Kenya, losing signal mid-tap is normal, not an edge case.',
    approach: [
      'Show cached data first, then refresh in the background',
      'Make every write safe to retry',
      'Design clear loading, offline and failed states before the happy path'
    ],
    watchFor: 'Stale data. Show when something was last updated.',
    whereUsed: 'Pursuit was designed for intermittent connectivity from day one.',
    tags: ['React Native', 'Expo', 'Apollo cache']
  },
  {
    topic: 'Performance',
    quote: 'How do I keep a feed fast as it grows?',
    problem: 'Pages that were fast with 100 items crawl at 10,000.',
    approach: [
      'Measure first, and find the slow query or render',
      'Paginate and lazy-load, so you only fetch what\'s on screen',
      'Cache reads that repeat; index what you filter on'
    ],
    watchFor: 'Cache invalidation. Choose what can be stale and for how long.',
    whereUsed: 'Caching, lazy loading and pagination for sessions with 1,000+ viewers at Walking on Earth; Redis cache-aside in Pursuit.',
    tags: ['Redis', 'PostgreSQL', 'React']
  },
  {
    topic: 'Async work',
    quote: 'What happens to slow, heavy jobs?',
    problem: 'Video encoding, emails and reports block the request and time out.',
    approach: [
      'Move heavy work out of the request path into a queue',
      'Return fast with a job status the client can poll or subscribe to',
      'Make workers retry safely and report failures'
    ],
    watchFor: 'Silent failures. Every job needs visible status and alerts.',
    whereUsed: 'Async transcoding workers for a video-on-demand platform at Nifty Works.',
    tags: ['Celery', 'Redis', 'GCP']
  },
  {
    topic: 'Data',
    quote: 'How do I keep data trustworthy as the product changes?',
    problem: 'Schemas drift, migrations break old records, and nobody trusts the numbers.',
    approach: [
      'Type the schema end to end: database, API and client share one source of truth',
      'Ship backwards-compatible migrations: expand, backfill, then contract',
      'Instrument features with a success metric defined before building'
    ],
    watchFor: 'Vanity metrics and silent nulls. Validate data where it enters, not where it\'s used.',
    whereUsed: 'Shared data model across Pursuit\'s clients; Mixpanel and Firebase analytics at Walking on Earth; dashboards and a recommendation system at Reaction Power.',
    tags: ['PostgreSQL', 'TypeScript', 'Mixpanel', 'AWS Glue']
  },
  {
    topic: 'AI agents',
    quote: 'How do I make an AI agent reliable?',
    problem: 'Models are confident and wrong, and prompts can be hijacked.',
    approach: [
      'Let the model route and reason; keep rules, maths and money in deterministic code',
      'Ground answers with retrieval, guardrails and structured outputs',
      'Test it like software: automated suites plus prompt-injection checks'
    ],
    watchFor: 'Cost and latency. Use smaller models for routing and bigger ones only where needed.',
    whereUsed: 'A five-agent support system on Bedrock AgentCore: 120/120 tests passing, with tracing on every hop.',
    tags: ['Python', 'Bedrock AgentCore', 'Strands', 'MCP']
  },
  {
    topic: 'Shipping',
    quote: 'How do I release without breaking production?',
    problem: 'Bugs reach users when checks happen only in people\'s heads.',
    approach: [
      'Automate tests and builds in CI for every change',
      'Check releases against the spec with a QA gate before shipping',
      'Monitor errors in production so issues surface before users report them'
    ],
    watchFor: 'Slow pipelines. Keep CI fast, or people skip it.',
    whereUsed: 'GitHub Actions + QA gates in Pursuit; Sentry at Walking on Earth.',
    tags: ['GitHub Actions', 'Jest', 'Playwright', 'Sentry']
  }
];

export const blocks: Block[] = [
  {
    name: 'Data structures & algorithms',
    code: '01',
    headline: 'Foundations first.',
    text: 'The right structure makes half the code disappear. I choose how data is shaped and searched before choosing a framework.',
    reachFor: ['Hash maps', 'Trees', 'Queues', 'Graphs', 'Big-O'],
    holdsUp: 'Fast queries, simple APIs and code that scales without rewrites.',
    shape: 'T'
  },
  {
    name: 'Data',
    code: '02',
    headline: 'Model it, move it, measure it.',
    text: 'Clean relational schemas, pipelines that move data reliably, and numbers people trust. Currently going deeper into data engineering on AWS.',
    reachFor: ['PostgreSQL / DynamoDB', 'S3', 'Glue', 'Athena / Redshift', 'Pandas'],
    holdsUp: 'Every API response, report and recommendation.',
    shape: 'I'
  },
  {
    name: 'Backend',
    code: '03',
    headline: "Logic that's boring to operate.",
    text: 'Clear APIs, business rules in tested code and heavy work kept off the request path. Boring here means reliable at 3 a.m.',
    reachFor: ['Django / Node.js', 'GraphQL / REST', 'Celery', 'Redis'],
    holdsUp: 'Every screen, integration and payment.',
    shape: 'L'
  },
  {
    name: 'System design & AI',
    code: '04',
    headline: 'How the pieces talk.',
    text: 'Where to queue, where to cache, what fails gracefully, and what it costs to run. AI agents route and reason; deterministic code makes the final call.',
    reachFor: ['AWS / GCP', 'Queues / Pub/Sub', 'Caching', 'Bedrock AgentCore', 'MCP'],
    holdsUp: 'Products that stay fast, safe and affordable as they grow.',
    shape: 'S'
  },
  {
    name: 'Frontend & mobile',
    code: '05',
    headline: 'The part people touch.',
    text: 'Fast, accessible interfaces built on a clear data model. They should feel as good on a mid-range Android on 3G as on a flagship.',
    reachFor: ['React / Angular', 'Next.js', 'React Native / Expo', 'TypeScript'],
    holdsUp: 'The moment someone decides whether to trust the product.',
    shape: 'O'
  }
];

export const experiences: Experience[] = [
  {
    company: 'Pursuit HQ',
    role: 'Founder & Independent Software Engineer',
    date: 'Aug 2025 – now',
    location: 'Nairobi',
    type: 'Own company + client work',
    impact: { value: 'Solo', label: 'built Pursuit end to end, iOS + web' },
    oneLiner: 'I build products for clients, and Pursuit, my own events and travel platform.',
    highlights: [
      'Payment flow that can\'t double-charge: transactions, row locks, idempotency',
      'Relational schema + GraphQL API with Redis caching',
      'One React Native client architecture for every content type',
      'CI/CD and spec-checked QA gates before every release',
      'AI-assisted workflows with review rubrics that catch hallucinated APIs'
    ],
    tags: ['React Native', 'Django', 'GraphQL', 'PostgreSQL', 'Redis', 'M-Pesa'],
    link: 'https://pursuit.co.ke'
  },
  {
    company: 'Walking on Earth',
    role: 'Software Engineer (Full Stack)',
    date: 'Oct 2023 – Jul 2025',
    location: 'UK, remote',
    type: 'Digital health, B2B',
    impact: { value: '500+', label: 'new app downloads from mobile work' },
    oneLiner: 'Owned web and mobile features end to end for a UK digital health platform.',
    highlights: [
      'Caching, lazy loading and pagination for 1,000+ viewer sessions',
      'Content discovery and recommendations across web, mobile and API',
      'Webinar feedback redesign: 50+ responses per session',
      'Jira and Slack API integrations for business customers',
      'Mixpanel, Firebase and Sentry for analytics and monitoring'
    ],
    tags: ['React', 'React Native', 'TypeScript', 'Django', 'GraphQL', 'Sentry']
  },
  {
    company: 'Reaction Power',
    role: 'Software Engineer & Data Analyst',
    date: 'Apr – Dec 2023',
    location: 'Remote, part-time',
    type: 'Marketing & media',
    impact: { value: 'Recsys', label: 'recommendation system for thought leaders' },
    oneLiner: 'Turned social and web data into content decisions.',
    highlights: [
      'Recommendation system from social listening and engagement data',
      'Sentiment and trend analysis for executive strategy',
      'Looker Studio dashboards from Google Analytics',
      'SEO improvements to WordPress content'
    ],
    tags: ['Python', 'Google Analytics', 'Looker Studio', 'SEO']
  },
  {
    company: 'Nifty Works',
    role: 'Software Engineer via Andela Bridge',
    date: 'Oct 2022 – Apr 2023',
    location: 'Remote',
    type: 'Video streaming',
    impact: { value: 'VOD', label: 'video platform, front end to cloud' },
    oneLiner: 'Co-built a video-on-demand platform across the whole stack.',
    highlights: [
      'Angular, Django, REST, PostgreSQL and GCP',
      'Transcoding to multiple resolutions for adaptive streaming',
      'Async workers keep heavy media jobs off the request path',
      'REST services for content and media management'
    ],
    tags: ['Angular', 'Django', 'PostgreSQL', 'GCP']
  },
  {
    company: 'Park Place Business Centre',
    role: '[role]',
    date: '[dates]',
    location: 'Nairobi',
    type: 'Co-working space',
    impact: { value: 'Ops', label: 'IT and the website for a working business' },
    oneLiner: 'Where I learned how a business actually runs.',
    highlights: [
      'Restructured and migrated the website, including booking flows',
      'Ran IT alongside reception, office management and procurement',
      'Worked with Meta and Google Ads data'
    ],
    tags: ['Web', 'IT', 'Meta Ads', 'Google Ads']
  },
  {
    company: 'DewCis Solutions',
    role: 'Software Engineering Intern',
    date: 'Jun 2021 – Feb 2022',
    location: 'Nairobi',
    type: 'Software agency',
    impact: { value: 'Day 1', label: 'where it started' },
    oneLiner: 'My first engineering role.',
    highlights: [
      'Built and maintained client sites on WordPress and other CMS platforms',
      'Contributed to a point-of-sale system in an agile team',
      'Mentored in systems thinking through the CodePamoja programme'
    ],
    tags: ['WordPress', 'CMS', 'Point of sale', 'CodePamoja']
  }
];

export const projects: Project[] = [
  {
    id: 'pursuit',
    label: 'Pursuit',
    status: 'LIVE · iOS + WEB',
    kicker: 'PURSUIT',
    title: 'Pursuit',
    body: 'Plan trips and events with your people: discover, budget, vote and pay with M-Pesa.',
    tracks: [
      'Group plans with swipe-voting',
      'M-Pesa payments that never double-charge',
      'One codebase for iOS and web',
      'Itineraries, budgets and calendar sync'
    ],
    tags: ['React Native', 'Expo', 'Django', 'GraphQL', 'PostgreSQL', 'Redis'],
    link: 'https://pursuit.co.ke'
  },
  {
    id: 'novamart',
    label: 'NovaMart multi-agent support',
    status: 'AWS · 120/120 TESTS',
    kicker: 'NOVAMART',
    title: 'NovaMart multi-agent support',
    body: 'Five AI agents that resolve customer requests together, with the rules kept in code.',
    tracks: [
      'Orchestrator routes to inventory, refund, policy and comms agents',
      'Parallel RAG across three knowledge bases',
      'Guardrails, memory and X-Ray tracing on every hop',
      '120/120 automated tests plus prompt-injection checks'
    ],
    tags: ['Python', 'Bedrock AgentCore', 'Strands', 'DynamoDB', 'Cognito']
  },
  {
    id: 'ai-support',
    label: 'AI customer support agent',
    status: 'AWS',
    kicker: 'AI SUPPORT',
    title: 'AI customer support agent',
    body: 'An agent with real tools, memory and retrieval, built to fail safely.',
    tracks: [
      'Order and refund tools over MCP via AgentCore Gateway',
      'Knowledge-base RAG and cross-session memory',
      'Found and fixed a sandbox flaw that could overwrite trusted values',
      'Isolated failures so one outage can\'t take the agent down'
    ],
    tags: ['Python', 'Strands', 'MCP', 'Lambda']
  },
  {
    id: 'bug-triage',
    label: 'Bug-report triage bot',
    status: 'AWS',
    kicker: 'BUG TRIAGE',
    title: 'Bug-report triage bot',
    body: 'Routes bug reports, answers FAQs and collects missing details before filing.',
    tracks: [
      'Three-route classifier prompt',
      'Lambda + DynamoDB intake tool',
      'Hardened against prompt injection',
      '11-case test suite'
    ],
    tags: ['Prompt engineering', 'AgentCore Gateway', 'Lambda']
  },
  {
    id: 'extension',
    label: 'Browser extension',
    status: 'GITHUB',
    kicker: 'BROWSER EXTENSION',
    title: 'Browser extension',
    body: '[one-liner placeholder]',
    tracks: ['[feature placeholder]', '[feature placeholder]', '[feature placeholder]'],
    tags: ['TypeScript']
  },
  {
    id: 'chatbot',
    label: 'SME support chatbot',
    status: 'IN PROGRESS',
    kicker: 'SME CHATBOT',
    title: 'SME support chatbot',
    body: 'An AI agent that answers customers on WhatsApp, Instagram and the web, so small businesses never miss a sale.',
    tracks: ['[feature placeholder]', '[feature placeholder]', '[feature placeholder]'],
    tags: ['Django', 'GraphQL', 'AI']
  }
];

export const interests: Interest[] = [
  { label: 'Chess', note: 'Climbing toward a 1000 rating, one blunder at a time.', glyph: '♞' },
  { label: 'Swimming', note: "Laps are where I solve the bugs I couldn't at my desk.", glyph: '≈' },
  { label: 'Baking', note: 'Alternative recipes, run like experiments.', glyph: '◒' },
  { label: 'Fiction', note: '[A book I\'m reading now]', glyph: '✦' },
  { label: 'Quantum computing', note: 'The long game, learned slowly and on purpose.', glyph: '⌁' }
];

export const tapeCodes = ['T-120', 'E-180', 'T-90', 'SP-60', 'T-160', 'E-30'];

// Tetris pieces for Building Blocks channel: [col, row] with row 0 = bottom
export const tetrisPieces: { cells: [number, number][]; color: string }[] = [
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: '#4b4fa8' }, // O · DSA
  { cells: [[2, 0], [3, 0], [4, 0], [4, 1]], color: '#c9b6f0' }, // L · Data
  { cells: [[2, 1], [3, 1], [3, 2], [4, 2]], color: '#f2b8d4' }, // S · Backend
  { cells: [[0, 2], [1, 2], [2, 2], [0, 3]], color: '#7fa2ec' }, // J · System design
  { cells: [[1, 3], [2, 3], [3, 3], [4, 3]], color: '#ff6b1a' }  // I · Frontend & mobile
];
