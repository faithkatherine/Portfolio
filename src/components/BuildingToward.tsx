"use client";

const buildingToward = [
  "React Native Web - building Pursuit's web layer with shared code",
  "AI-integrated development - Claude Code and Copilot as structured workflow tools, not autocomplete",
  "System design for mobile-first, low-bandwidth conditions",
  "AWS AI & ML Scholars program, currently in progress",
];

const BuildingToward = () => {
  return (
    <section
      id="building-toward"
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          What I&apos;m <span className="text-purple-600">building toward</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Forward momentum, not just a skills list
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buildingToward.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-l-4 border-purple-500"
            >
              <div className="flex items-start">
                <span className="text-purple-500 font-bold text-2xl mr-4">
                  →
                </span>
                <span className="text-gray-700 leading-relaxed font-medium">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingToward;
