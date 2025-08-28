'use client';

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

const Projects = () => {
  const projects = [
    {
      title: "Pursuit App",
      description: "A web and mobile platform that helps users discover local events and experiences. Built with React, React Native, Django, GraphQL, and PostgreSQL, it includes location-based activity filtering, user onboarding flows, and custom content recommendation features.",
      technologies: ["React", "React Native", "Django", "GraphQL", "PostgreSQL"]
    },
    {
      title: "EduShare",
      description: "Collaborative e-learning platform offering video and text resources for remote learners. Worked on frontend integration and platform structure.",
      technologies: ["React", "JavaScript", "CSS"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
