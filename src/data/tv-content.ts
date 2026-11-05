// Canvas: fixed height 600px, fluid width (clamped 960-1280px)
export const CANVAS_SIZE = {
  height: 600,
  minWidth: 960,
  maxWidth: 1280,
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
  body: string;
  practice: string[];
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
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
  features: string[];
  tags: string[];
  actions: string[];
};

export type Interest = {
  label: string;
  note: string;
  glyph: string;
};

export const channels: Channel[] = [
  { id: 'hello', number: '01', short: 'Hello', title: 'HELLO', tint: 'blue', signalText: 'Products from data model to the screen in your hand.' },
  { id: 'think', number: '02', short: 'How I think', title: 'HOW I THINK', tint: 'indigo', signalText: 'Trade-offs make the product legible.' },
  { id: 'blocks', number: '03', short: 'Building blocks', title: 'BUILDING BLOCKS', tint: 'lilac', signalText: 'Strong foundations, then useful abstractions.' },
  { id: 'experience', number: '04', short: 'Experience', title: 'EXPERIENCE', tint: 'pink', signalText: 'Learn fast. Ship carefully. Keep moving.' },
  { id: 'projects', number: '05', short: 'Projects', title: 'PROJECTS', tint: 'blue', signalText: 'Small bets, shipped end to end.' },
  { id: 'offclock', number: '06', short: 'Off the clock', title: 'OFF THE CLOCK', tint: 'indigo', signalText: 'Curiosity is part of the toolkit.' },
  { id: 'contact', number: '07', short: 'Contact', title: 'CONTACT', tint: 'lilac', signalText: 'Open for good problems.' }
];

export const opinions: Opinion[] = [
  { topic: 'Backend', quote: 'APIs are contracts.', body: 'An endpoint is a promise to whoever calls it. I keep schemas typed, versioned and documented, so breaking a client is a decision, never an accident.', practice: ["One GraphQL schema serving Pursuit's iOS and web apps", 'Jira and Slack API integrations for B2B customers at WONE.'], tags: ['Django', 'GraphQL', 'PostgreSQL'] },
  { topic: 'Payments', quote: 'Money moves exactly once.', body: 'When a payment request retries, nobody should pay twice. I build payment flows with idempotency keys and row locks from the first commit.', practice: ['M-Pesa STK Push via Safaricom Daraja in Pursuit', 'Redis idempotency keys plus SELECT FOR UPDATE on every charge.'], tags: ['M-Pesa Daraja', 'Redis', 'PostgreSQL'] },
  { topic: 'Mobile', quote: 'The network is not your friend.', body: 'People lose signal mid-tap. I design for slow connections, retries and offline states first, then polish the happy path.', practice: ['Pursuit was designed from day one for intermittent connectivity', 'Device camera and image capture shipped at WONE.'], tags: ['React Native', 'Expo', 'Firebase'] },
  { topic: 'Data', quote: "If you can't measure it, you didn't ship it.", body: 'I instrument features from day one, so every release comes with an answer to "did it work?"', practice: ['Moved recurring reports from slide decks to live Looker Studio dashboards', 'Google Tag Manager and Analytics set up on company sites.'], tags: ['Mixpanel', 'Looker Studio', 'SQL'] },
  { topic: 'System design', quote: 'Boring architecture, chosen on purpose.', body: 'The simplest design that survives growth: queues where work can wait, caches where reads repeat, and a written note on why.', practice: ['Background work in Celery queues, not request handlers', 'Redis for locks and idempotency in payment flows.'], tags: ['Redis', 'Celery', 'AWS'] },
  { topic: 'Frontend', quote: 'The data model comes before the screens.', body: 'Clear state makes simple interfaces. I settle what the data is and who owns it, and the UI gets easier to build and to change.', practice: ['A shared / mobile / web code split, so Pursuit reuses logic across platforms', "Built WONE's website in React and Next.js."], tags: ['React', 'Next.js', 'TypeScript'] },
  { topic: 'Quality', quote: 'Tests are how I sleep.', body: 'Unit tests for logic, end-to-end tests for the flows that matter, and error monitoring for whatever I missed.', practice: ['Jest for units, Playwright for end-to-end flows', 'Sentry alerts before users notice.'], tags: ['Jest', 'Playwright', 'Sentry'] }
];

export const blocks = [
  { name: 'Data structures & algorithms', code: '01', headline: 'Foundations first.', text: 'Pick the right structure and half the code disappears. I choose the data structure first, then the algorithm, then the framework.', shape: 'T' },
  { name: 'Data', code: '02', headline: 'Model it, move it, measure it.', text: 'Clean schemas, reliable pipelines and numbers people can trust. Currently going deeper into data engineering on AWS.', shape: 'I' },
  { name: 'Backend', code: '03', headline: "Logic that's boring to operate.", text: 'Django and GraphQL APIs, background jobs with Celery, and Postgres indexed before it gets slow.', shape: 'L' },
  { name: 'System design', code: '04', headline: 'How the pieces talk.', text: 'Where to queue, where to cache, what fails gracefully, and what it costs to run.', shape: 'S' },
  { name: 'Frontend & mobile', code: '05', headline: 'The part people touch.', text: 'Fast, accessible React and React Native apps that feel just as good on a mid-range Android as on a flagship.', shape: 'O' }
];

export const experiences: Experience[] = [
  { company: 'Pursuit HQ', role: 'Founder', date: 'Aug 2025–now', location: 'Nairobi', bullets: ['I started Pursuit HQ to build my own products and take on software and AI work for clients.', 'Designed and built Pursuit, a travel app for web and iOS, as the sole engineer', 'Software development and AI training and evaluation work for clients', '[Outcome placeholder]'], tags: ['React Native', 'Expo', 'Django', 'M-Pesa'], link: '#projects' },
  { company: 'Walking on Earth', role: 'Feature Lead', date: 'Oct 2023–Jul 2025', location: 'UK, remote', bullets: ['Led features on a B2B digital health platform and shaped how the engineering team worked.', 'Built the company website in React and Next.js', 'Shipped profile image capture with device camera handling', 'Integrated the Jira API and built Slack API features for business customers'], tags: ['React', 'Next.js', 'Jira API', 'Slack API'] },
  { company: 'Nifty Works', role: 'Software Engineer via Andela', date: '[dates]', location: 'Remote', bullets: ["Joined through Andela's Bridge programme and shipped production code on evenings and weekends, alongside a full-time role.", '[What I built]', '[A decision I owned]', '[Outcome]'], tags: ['Andela', 'Software engineering'] },
  { company: 'Reaction Power', role: '[Role]', date: '[dates]', location: 'Nairobi', bullets: ['Turned marketing data into decisions.', 'Social listening, SEO and data analysis on a recurring reporting cadence', 'Moved reporting from slide decks to live Looker Studio dashboards', 'Set up Google Tag Manager and Google Analytics'], tags: ['Looker Studio', 'Google Tag Manager', 'Google Analytics'] },
  { company: 'Park Place Business Centre', role: '[Role]', date: '[dates]', location: 'Nairobi', bullets: ['Where I learned how a business actually runs.', 'Restructured and migrated the website, including booking flows', 'Ran IT alongside reception, office management and procurement', 'Worked with Meta and Google Ads data'], tags: ['Web', 'IT', 'Meta Ads', 'Google Ads'] },
  { company: 'DewCis Solutions', role: 'Software Engineering Intern', date: 'Jun 2021–Feb 2022', location: 'Nairobi', bullets: ['My first engineering role.', 'Built and maintained client sites on WordPress and other CMS platforms', 'Contributed to a point-of-sale system in an agile team', 'Mentored in systems thinking through the CodePamoja programme'], tags: ['WordPress', 'CMS', 'Point of sale', 'CodePamoja'] }
];

export const projects: Project[] = [
  { id: 'pursuit', label: 'Pursuit', status: 'LIVE · iOS + WEB', kicker: 'PURSUIT', title: 'Pursuit', body: 'Plan trips with your people. Vote on the plan, pay with M-Pesa, and keep going when the signal drops.', features: ['Group plans with swipe-voting', 'M-Pesa STK Push with Redis idempotency and row locks, so nobody is charged twice', 'One codebase for iOS and web.'], tags: ['React Native', 'Expo', 'Django', 'GraphQL', 'PostgreSQL', 'Redis'], actions: ['Play project'] },
  { id: 'extension', label: 'Browser extension', status: 'GITHUB', kicker: 'BROWSER EXTENSION', title: 'Browser extension', body: '[one-liner placeholder]', features: ['[feature placeholder]', '[feature placeholder]', '[feature placeholder]'], tags: ['TypeScript'], actions: ['Play project'] },
  { id: 'agents', label: 'Custom AI agents', status: 'GITHUB · DEMO SOON', kicker: 'CUSTOM AI AGENTS', title: 'Custom AI agents', body: '[one-liner placeholder]', features: ['[feature placeholder]', '[feature placeholder]', '[feature placeholder]'], tags: ['Python'], actions: ['Play project'] },
  { id: 'chatbot', label: 'SME support chatbot', status: 'IN PROGRESS', kicker: 'SME SUPPORT CHATBOT', title: 'SME support chatbot', body: 'An AI agent that answers customers on WhatsApp, Instagram and the web, so small businesses never miss a sale.', features: ['[feature placeholder]', '[feature placeholder]', '[feature placeholder]'], tags: ['Django', 'GraphQL', 'AI'], actions: ['Play project'] }
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
