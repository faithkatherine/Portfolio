'use client';

const stack = [
  'React Native', 'TypeScript', 'Expo Router', 'Apollo Client',
  'Django 5', 'Graphene-Django', 'GraphQL',
  'PostgreSQL 17', 'Redis', 'Celery', 'Docker', 'Render IaC',
];

const architectureDecisions = [
  {
    title: 'Single aggregate GraphQL query for the home screen',
    content:
      'The home screen has five data sources: editor\'s picks, trending, upcoming, categories, and personalised feed. On a mobile connection in Nairobi - often 3G - five network round trips is a broken product. One getHome query returns everything. Cold load under 800ms.',
  },
  {
    title: 'Redis cache-aside with user-scoped keys',
    content:
      'Home screen data is expensive to compute but changes slowly. User-scoped Redis keys mean the cache warms on first load and stays fast on return. TTL is tuned to event recency, not a generic 5-minute timeout.',
  },
  {
    title: 'Location as a string tag, not a City FK',
    content:
      'Nairobi events don\'t map cleanly to administrative boundaries. "Westlands" is a neighbourhood, a nightlife zone, and a commercial district - none of which match any official geodata. A location_tag string let me ship faster and gave curators flexibility that a City model never would.',
  },
  {
    title: 'EditorsPick as a separate model with a required curator_note',
    content:
      'The "Editor\'s Pick" badge needs to mean something. A boolean flag on an Event model is meaningless - a second model with a required curator_note field forces accountability. The badge can\'t be set accidentally. Editorial integrity is enforced at the schema level.',
  },
];

const stats = [
  { number: '3+', label: 'Years of experience' },
  { number: '10+', label: 'Projects completed' },
  { number: '100%', label: 'Solo built Pursuit' },
];

const Projects = () => {
  return (
    <>
      {/* Stats Section with gradient background */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-xl">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">
                    {stat.number}
                  </span>
                </div>
                <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Over <span className="text-purple-600">three years</span> of building,
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              I transform concepts into unique products using{' '}
              <span className="text-purple-600 font-semibold">creativity</span> and{' '}
              <span className="text-pink-500 font-semibold">modern tech stacks</span>{' '}
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Pursuit Section */}
      <section id="pursuit" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pursuit
          </h2>
          
          {/* What it is */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Pursuit is a hyperlocal event discovery app for Nairobi, Kenya. Editorial curation over an events database — think TimeOut, but actually maintained. Built solo from schema to shipped UI under Pursuit HQ, my registered sole proprietorship.
            </p>
          </div>

          {/* The stack */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              The Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* How it's built — architecture decisions */}
          <div className="mb-12">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
              How it&apos;s built - architecture decisions
            </h3>
            <div className="space-y-8">
              {architectureDecisions.map((decision, i) => (
                <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="text-xl font-bold text-purple-700 mb-3">
                    {decision.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {decision.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Screen showcase - using Pursuit UI Kit */}
          <div className="mb-12">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
              Screen showcase
            </h3>
            
            {/* Embedded Pursuit UI Kit */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="aspect-video w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <iframe
                  src="/Pursuit UI Kit (standalone).html"
                  className="w-full h-full"
                  title="Pursuit UI Kit"
                  style={{ border: 'none' }}
                />
              </div>
              <p className="text-gray-600 text-center mt-4 italic">
                Interactive Pursuit UI Kit - Explore the full mobile interface design
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-bold hover:shadow-xl transition-all transform hover:scale-105 text-center"
              >
                Download App (Expo)
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-white border-2 border-purple-500 text-purple-600 rounded-lg text-lg font-bold hover:bg-purple-50 transition-all text-center"
              >
                Try Web Version
              </a>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com/faithkatherine/pursuit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors text-center"
            >
              View on GitHub
            </a>
            <a
              href="/Pursuit_Portfolio_final.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors text-center"
            >
              Full Case Study (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
