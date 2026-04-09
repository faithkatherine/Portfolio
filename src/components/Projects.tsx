'use client';

import { useState } from 'react';

const features = [
  {
    title: 'Authentication',
    content:
      'Custom floating label form components with real-time client-side validation. Google OAuth via expo-auth-session exchanges the id_token server-side. Login returns a JWT access token, refresh token, and session token stored securely on device. Two GraphQL mutations handle sign-out: single-device and all-device revocation for account compromise scenarios.',
    tags: ['expo-auth-session', 'JWT', 'Google OAuth', 'Client-side validation', 'Session management'],
  },
  {
    title: 'Onboarding Flow',
    content:
      'Multi-step wizard with progress dot indicators and a persistent Skip button on every step. Location, notification, and email preferences captured as toggles and stored on UserProfile. Interest selection uses a multi-select pill-chip grid in a bottom sheet — saved as a ManyToMany relation and passed into the GraphQL recommendations resolver on every home load.',
    tags: ['Expo Router', 'expo-location', 'expo-notifications', 'ManyToMany', 'Bottom sheet UI'],
  },
  {
    title: 'Home Screen',
    content:
      'Driven by a single GraphQL getHome query — greeting, weather, recommendations, and upcoming events in one round-trip. Weather widget calls an external API on load. Recommendations are ranked by interest category match, cross-referencing UserProfile.interests with event categories in PostgreSQL.',
    tags: ['GraphQL getHome', 'Weather API', 'Interest matching', 'Expo Router tabs', 'Personalised feed'],
  },
  {
    title: 'Events & Discovery',
    content:
      'Swipeable card stack with animated gesture handling built directly in React Native — right swipe saves, left skips. List view includes a debounced search bar to avoid unnecessary API calls. GraphQL resolver uses select_related to fetch nested event, category, and location data in a single query, preventing N+1 issues.',
    tags: ['Gesture handling', 'Debounced search', 'GraphQL resolvers', 'Category filtering', 'select_related'],
  },
  {
    title: 'Architecture & Infrastructure',
    content:
      'Redis cache-aside pattern on the getHome resolver with per-data-type TTLs (weather 30min, recommendations 1hr, home aggregate 15min). Cache keys include user ID to prevent cross-user data leakage. Celery handles async notification delivery with Redis as the task broker. Deployed on Render with render.yaml IaC — staging auto-deploys on every push to main with an isolated database and secrets generated at deploy time.',
    tags: ['Redis cache-aside', 'Celery', 'Docker', 'render.yaml IaC', 'PostgreSQL 17', 'JWT'],
  },
];

const stack = [
  'React Native', 'TypeScript', 'Expo Router', 'Apollo Client',
  'Django 5.0', 'Graphene-Django', 'PostgreSQL 17',
  'Redis', 'Celery', 'Docker', 'Render IaC',
];

const PursuitCard = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenFeature(openFeature === i ? null : i);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden col-span-1 md:col-span-2">
      {/* Dark header */}
      <div className="bg-[#1C1033] px-6 pt-6 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Pursuit App</h3>
            <p className="text-white/50 text-sm italic">
              Local event discovery · Nairobi, Kenya · Full-stack solo build from schema to shipped UI
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-[#7B5EA7] text-white rounded-full text-xs font-medium">
              Live · Staging
            </span>
            <span className="px-2.5 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium">
              Solo build
            </span>
            <span className="px-2.5 py-1 bg-white/10 text-white/70 rounded-full text-xs font-medium">
              Pursuit HQ
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          A React Native mobile app for discovering and planning local events in Nairobi, built entirely
          solo — covering product design, API architecture, database schema, and mobile UI. Every layer
          designed and owned end to end: from the PostgreSQL data model and GraphQL API through to the
          React Native component system and Render deployment infrastructure.
        </p>

        {/* Feature accordion */}
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Feature breakdown
        </h4>
        <div className="space-y-2 mb-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="text-sm font-medium text-gray-800">{f.title}</span>
                <span className="text-[#7B5EA7] font-medium text-base leading-none select-none">
                  {openFeature === i ? '−' : '+'}
                </span>
              </button>
              {openFeature === i && (
                <div className="px-4 py-4 bg-white border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {f.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-0.5 bg-[#F3EEFF] text-[#7B5EA7] rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stack */}
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Stack
        </h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {stack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href="https://github.com/faithkatherine/pursuit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1C1033] text-white rounded-md text-sm font-medium hover:bg-[#2a1a4a] transition-colors"
          >
            GitHub
          </a>
          <a
            href="/Portfolio/Pursuit_Portfolio_final.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#7B5EA7] text-[#7B5EA7] rounded-md text-sm font-medium hover:bg-[#F3EEFF] transition-colors"
          >
            Full Case Study
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({
  title,
  description,
  technologies,
}: {
  title: string;
  description: string;
  technologies: string[];
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const otherProjects = [
  {
    title: 'EduShare',
    description:
      'Collaborative e-learning platform offering video and text resources for remote learners. Worked on frontend integration and platform structure.',
    technologies: ['React', 'JavaScript', 'CSS'],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PursuitCard />
          {otherProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
