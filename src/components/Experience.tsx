'use client';

const experiences = [
  {
    company: 'Walking on Earth (WONE)',
    period: '2023-2025',
    description:
      'UK digital health platform. Feature lead on the mobile team - owned the mindfulness session module end to end, from product spec to React Native delivery. Worked in a distributed team across Nairobi and London.',
    color: 'from-orange-400 to-pink-400',
  },
  {
    company: 'Pursuit HQ',
    period: '2024-present',
    description: 'Sole proprietorship. Building Pursuit.',
    color: 'from-purple-400 to-pink-400',
  },
  {
    company: 'Reaction Power',
    period: '2023',
    description: 'Python recommendation engine. GA4 and Looker Studio analytics.',
    color: 'from-pink-400 to-orange-300',
  },
  {
    company: 'Nifty Works via Andela',
    period: '2022-2023',
    description: 'Full-stack development on client products.',
    color: 'from-purple-300 to-purple-500',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
          Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${exp.color} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{exp.company}</h3>
                <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
              <p className="text-white/90 leading-relaxed text-lg">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
