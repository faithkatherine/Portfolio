'use client';

const ExperienceItem = ({
  title,
  company,
  period,
  points,
}: {
  title: string;
  company: string;
  period: string;
  points: string[];
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-2">
      {company} | {period}
    </p>
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      {points.map((point, index) => (
        <li key={index} className="ml-4">{point}</li>
      ))}
    </ul>
  </div>
);

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Walking on Earth",
      period: "Oct 2023 – July 2025",
      points: [
        "Built and maintained features for the WONE web platform and mobile app using React, React Native, Django, and GraphQL.",
        "Integrated analytics using Firebase and Mixpanel.",
        "Used Sentry to enhance error tracking and debugging workflows.",
        "Contributed to website revamps and frontend improvements using ReactJS and Tailwind CSS.",
        "Leveraged AI tools like GitHub Copilot and ChatGPT to write code faster, improve developer workflows, and assist in documentation.",
        "Collaborated with engineers to reduce technical debt, refactor code, and boost performance."
      ]
    },
    {
      title: "Software Engineer",
      company: "Nifty Works (Andela Bridge Program)",
      period: "Oct 2022 – Apr 2023",
      points: [
        "Co-developed a fullstack Video-on-Demand platform using Angular, Django, REST APIs, and Google Cloud Platform.",
        "Co-developed backend architecture tasks, including database schema design and cloud media handling."
      ]
    },
    {
      title: "Developer & Data Analyst",
      company: "Reaction Power",
      period: "Apr 2023 – Dec 2023",
      points: [
        "Managed website and blog content via WordPress with SEO enhancements.",
        "Produced executive-level insights through data visualization and Google Analytics.",
        "Conducted social listening research and supported strategic content initiatives."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Professional Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
