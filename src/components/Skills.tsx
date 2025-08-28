'use client';

import { motion } from 'framer-motion';

const SkillCategory = ({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "Python", "SQL", "TypeScript"]
    },
    {
      title: "Frontend",
      skills: ["React", "React Native", "HTML5", "CSS3", "SCSS", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Django", "Django REST Framework", "GraphQL"]
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MySQL"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "Firebase", "Mixpanel", "Sentry", "GCP", "Vercel"]
    },
    {
      title: "AI/Dev Efficiency",
      skills: ["GitHub Copilot", "ChatGPT", "Prompt Engineering"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-900 mb-12 text-center"
        >
          Technical Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
