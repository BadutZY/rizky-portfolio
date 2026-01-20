import { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  filter: string;
  link: string;
  fullDescription?: string;
  image?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

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
        <div className="p-6 sm:p-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-4">
            {project.category}
          </span>
          
          <h3 id="modal-title" className="text-2xl font-bold text-foreground mb-4">
            {project.title}
          </h3>
          
          <p className="text-foreground-muted leading-relaxed mb-6">
            {project.fullDescription || project.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              View Project
            </a>
            <button
              onClick={onClose}
              className="btn-secondary text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
