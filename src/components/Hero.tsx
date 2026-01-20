import { ArrowDown } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const { displayText, isComplete } = useTypingEffect('Rizky', 150, 500);

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const headerHeight = 80;
      const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-background-secondary overflow-hidden"
      role="banner"
    >
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(30 100% 50% / 0.08) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Hai, My Name is{' '}
            <span className={`text-primary ${!isComplete ? 'typing-cursor' : ''}`}>
              {displayText}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            A beginner programmer just starting out on my coding journey. 
            I've created websites, mods, and released games.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#about" 
              onClick={handleScrollToAbout}
              className="btn-secondary group"
            >
              See More
              <ArrowDown className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) {
                  const headerHeight = 80;
                  window.scrollTo({ top: el.offsetTop - headerHeight, behavior: 'smooth' });
                }
              }}
              className="btn-primary"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-foreground-muted rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
