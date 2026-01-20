import { useState } from 'react';
import { ChevronDown, User, Calendar, GraduationCap, Code, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import profile from "@/assets/BadutZY.png";

const bioData = [
  { icon: User, label: 'Name', value: 'Rizky Maulana Putra', expandable: false },
  { icon: Calendar, label: 'Age', value: '17 Years', expandable: false },
  { icon: GraduationCap, label: 'Education', value: 'SMK (Vocational High School)', expandable: true, details: 'Currently pursuing vocational education with focus on practical skills and industry readiness.' },
  { icon: Code, label: 'Major', value: 'RPL (Software Engineering)', expandable: true, details: 'Specializing in software development, web technologies, and programming fundamentals.' },
  { icon: MapPin, label: 'Location', value: 'Bogor, Indonesia', expandable: false },
];

const About = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="section-padding bg-background"
      role="region"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div 
          ref={sectionRef}
          className={`fade-in ${sectionVisible ? 'show' : ''}`}
        >
          <h2 id="about-title" className="section-title">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-12 items-center">
          {/* Profile Image */}
          <figure
            ref={imageRef}
            className={`fade-in ${imageVisible ? 'show' : ''}`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative overflow-hidden rounded-2xl shadow-card group-hover:shadow-card-hover transition-all duration-500">

                {/* IMAGE FULL */}
                <div className="relative aspect-square w-full">
                  <img
                    src={profile}
                    alt="Rizky Maulana Putra Profile Picture"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

              </div>
            </div>
          </figure>

          {/* About Text */}
          <div
            ref={textRef}
            className={`fade-in delay-200 ${textVisible ? 'show' : ''}`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Beginner <span className="text-primary">Programmer</span>
            </h3>
            
            <p className="text-foreground-muted text-lg leading-relaxed mb-8">
              I'm a beginner programmer learning programming languages. I strive to create 
              engaging and functional websites, games, and mods. Every project is a new 
              opportunity to learn and grow.
            </p>

            {/* Biodata Accordion */}
            <dl className="space-y-3">
              {bioData.map((item, index) => {
                const Icon = item.icon;
                const isExpanded = expandedItem === index;
                
                return (
                  <div
                    key={item.label}
                    className={`bg-card rounded-xl overflow-hidden transition-all duration-300 ${
                      item.expandable ? 'cursor-pointer hover:bg-muted' : ''
                    }`}
                    onClick={() => item.expandable && setExpandedItem(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <dt className="text-sm text-foreground-muted">{item.label}</dt>
                        <dd className="font-semibold text-foreground truncate">{item.value}</dd>
                      </div>
                      {item.expandable && (
                        <ChevronDown 
                          className={`w-5 h-5 text-foreground-muted transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </div>
                    {item.expandable && item.details && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-32' : 'max-h-0'
                        }`}
                      >
                        <p className="px-4 pb-4 text-sm text-foreground-muted">
                          {item.details}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
