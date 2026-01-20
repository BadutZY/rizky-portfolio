import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useActiveSection } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const activeSection = useActiveSection();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 0);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a 
          href="#home" 
          className="text-xl md:text-2xl font-bold text-primary transition-transform duration-300 hover:scale-105"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          Rizky<span className="text-foreground"> Portfolio</span>
        </a>

        {/* Desktop Navigation */}
        <nav 
          role="navigation" 
          aria-label="Main navigation"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-card text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-glow"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? 'top-2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-2 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          id="mobile-nav"
          className={`absolute top-full left-0 right-0 glass md:hidden transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <ul className="flex flex-col p-4" role="list">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block py-3 px-4 text-lg font-medium transition-all duration-300 hover:text-primary hover:pl-6 ${
                    activeSection === link.href.slice(1) ? 'text-primary' : 'text-foreground'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
