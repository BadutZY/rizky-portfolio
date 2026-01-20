import { Code, Coffee, Gamepad2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const skills = [
  {
    icon: Code,
    iconColor: 'text-orange-500',
    title: 'Web Developer',
    description: 'Create dynamic and interactive websites with HTML, CSS, and JavaScript.',
    progress: 45,
  },
  {
    icon: Coffee,
    iconColor: 'text-amber-600',
    title: 'Minecraft Modding',
    description: 'Item stack size modification, unbreakable block override, uncraftable item crafting, etc with Java.',
    progress: 75,
  },
  {
    icon: Gamepad2,
    iconColor: 'text-purple-500',
    title: 'Game Developer',
    description: 'Create simple PvP Co-op games with Unity and C#.',
    progress: 25,
  },
];

const Skills = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="skills"
      className="section-padding bg-background-secondary"
      role="region"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <div
          ref={titleRef}
          className={`fade-in ${titleVisible ? 'show' : ''}`}
        >
          <h2 id="skills-title" className="section-title">My Skills</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: typeof skills[0];
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = skill.icon;

  return (
    <article
      ref={ref}
      className={`fade-in ${isVisible ? 'show' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="group bg-card rounded-2xl p-8 h-full card-hover text-center">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}>
          <Icon className={`w-10 h-10 ${skill.iconColor}`} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3">{skill.title}</h3>

        {/* Description */}
        <p className="text-foreground-muted mb-6 leading-relaxed">{skill.description}</p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Proficiency</span>
            <span className="font-semibold text-primary">{skill.progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-primary to-amber-400 rounded-full transition-all duration-1000 ease-out ${
                isVisible ? 'progress-animate' : ''
              }`}
              style={{ width: isVisible ? `${skill.progress}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Skills;
