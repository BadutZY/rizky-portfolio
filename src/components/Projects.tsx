import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ProjectModal from './ProjectModal';
import modImg from "@/assets/project/modrinth.png";
import riotImg from "@/assets/project/riot-games-website.png";
import boxImg from "@/assets/project/box-siege-website.png";
import eqnoxImg from "@/assets/project/eqnox-website.png";
import jktImg from "@/assets/project/jkt48-website.png";
import fritzyImg from "@/assets/project/fritzy-force-website.png";
import taskImg from "@/assets/project/task-manager.png";
import classImg from "@/assets/project/class-website.png";
import badutImg from "@/assets/project/badutzy-website.png";
import portoImg from "@/assets/project/portofolio.png";
  
const projects = [
  {
    id: 1,
    title: 'Minecraft Mods',
    category: 'Mods (Java)',
    image: modImg,
    description: 'Several minecraft mods available on modrinth.',
    filter: 'expert',
    link: 'https://modrinth.com/user/BadutZY/mods',
    fullDescription: 'There are several Minecraft mods that have been released, some have been updated, some still have bugs, and there are various kinds of mods.',
  },
  {
    id: 2,
    title: 'Riot Games Website',
    category: 'Vite / React',
    image: riotImg,
    description: 'Rebuilding the Riot Games website',
    filter: 'intermediate',
    link: 'https://riot-games-website.vercel.app/',
    fullDescription: 'I recreated this Riot Games website just for school assignment, and just tried using Vite/React to make it.',
  },
  {
    id: 3,
    title: 'Box Siege Website',
    category: 'Game (Unity / C#)',
    image: boxImg,
    description: 'Game Website',
    filter: 'hard',
    link: 'https://equinoxinteractive.github.io/BoxSiege/',
    fullDescription: 'Website to download games made by me and my team.',
  },
  {
    id: 4,
    title: 'Equinox Interactive Website',
    category: 'HTML / CSS / JavaScript',
    image: eqnoxImg,
    description: 'Company website for Equinox Interactive.',
    filter: 'basic',
    link: 'https://equinoxinteractive.github.io/EquinoxProfile/',
    fullDescription: 'Website from the team that I created with my friend to make games.',
  },
  {
    id: 5,
    title: 'JKT48 Website Remake',
    category: 'HTML / CSS / JavaScript',
    image: jktImg,
    description: 'Fan site for JKT48 group.',
    filter: 'basic',
    link: 'https://jkt48-website.vercel.app/',
    fullDescription: 'A fan-made website for JKT48 featuring member profiles, event schedules, news updates, and an interactive fan community section.',
  },
  {
    id: 6,
    title: 'Fritzy Force Website',
    category: 'HTML / CSS / JavaScript',
    description: 'Fanbase website for Fritzy Force.',
    image: fritzyImg,
    filter: 'basic',
    link: 'https://fritzy-force-website.vercel.app/',
    fullDescription: 'This is a fan-made website created by me for a fanbase called fritzy force.',
  },
  {
    id: 7,
    title: 'Task Manager',
    category: 'HTML / CSS / JavaScript + Local Storage',
    image: taskImg,
    description: 'Website task manager',
    filter: 'advanced',
    link: 'https://task-web-snowy.vercel.app/',
    fullDescription: 'Website to remind me about unfinished tasks, and I can send my tasks to the website.',
  },
  {
    id: 8,
    title: 'Class Website',
    category: 'HTML / CSS / JavaScript',
    description: 'Website for class',
    image: classImg,
    filter: 'basic',
    link: 'https://badutzy.github.io/11-rpl-2-web/',
    fullDescription: 'Website for my class, which contains the class schedule and duty schedule.',
  },
  {
    id: 9,
    title: 'BadutZY Website',
    category: 'HTML / CSS / JavaScript',
    description: 'Just a regular website',
    image: badutImg,
    filter: 'basic',
    link: 'https://badutzy.github.io/BadutZY/',
    fullDescription: 'A website that contains several things that I can download wherever I want.',
  },
  {
    id: 10,
    title: 'Portfolio Website',
    category: 'Vite / React',
    description: 'BadutZY portfolio website',
    image: portoImg,
    filter: 'intermediate',
    link: '#home',
    fullDescription: 'Portfolio website created to introduce yourself, show projects that have been worked on, etc.',
  }
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'basic', label: 'HTML/CSS/JS' },
  { id: 'intermediate', label: 'Vite/React' },
  { id: 'advanced', label: 'Local Storage' },
  { id: 'hard', label: 'Unity/C#' },
  { id: 'expert', label: 'Java' },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: filterRef, isVisible: filterVisible } = useScrollAnimation();

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.filter === activeFilter
  );

  return (
    <section
      id="projects"
      className="section-padding bg-background"
      role="region"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div
          ref={titleRef}
          className={`fade-in ${titleVisible ? 'show' : ''}`}
        >
          <h2 id="projects-title" className="section-title">My Projects</h2>
        </div>

        {/* Filter Buttons */}
        <nav
          ref={filterRef}
          className={`fade-in delay-200 ${filterVisible ? 'show' : ''}`}
          aria-label="Filter projects"
        >
          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`btn-filter ${activeFilter === filter.id ? 'active' : ''}`}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <article
      ref={ref}
      className={`fade-in ${isVisible ? 'show' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
      role="listitem"
    >
      <div
        className="group bg-card rounded-2xl overflow-hidden card-hover cursor-pointer h-full flex flex-col"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-muted aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-primary/80 mb-2">{project.category}</p>
          <p className="text-sm text-foreground-muted mb-4 flex-1">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Projects;
