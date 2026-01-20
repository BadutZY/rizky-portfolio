import { Youtube, Instagram, Twitter, Github } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SiTiktok } from "react-icons/si";


const socialLinks = [
  { icon: Youtube, href: 'https://youtube.com/@badutzy', label: 'YouTube', username: '@badutzy' },
  { icon: Instagram, href: 'https://instagram.com/rzky.mp_36', label: 'Instagram', username: '@rzky.mp_36' },
  { icon: Twitter, href: 'https://twitter.com/BadutZYY_', label: 'Twitter', username: '@BadutZYY_' },
  { icon: SiTiktok, href: 'https://tiktok.com/@badutzy._', label: 'TikTok', username: '@badutzy._' },
  { icon: Github, href: 'https://github.com/BadutZY', label: 'GitHub', username: '@BadutZY' },
];

// TikTok icon component since Lucide doesn't have it
const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      role="contentinfo"
      className="bg-background-secondary py-12 border-t border-border"
    >
      <div className="container">
        <div
          ref={ref}
          className={`fade-in ${isVisible ? 'show' : ''}`}
        >
          {/* Social Links */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-primary mb-6">Connect With Me</h3>
            <nav aria-label="Social media links">
              <ul className="flex justify-center gap-4" role="list">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-12 h-12 rounded-full bg-card text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-glow hover:scale-110"
                        aria-label={`${link.label} - ${link.username}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-foreground-muted text-sm">
              © {currentYear} <span className="text-primary font-medium">Rizky</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
