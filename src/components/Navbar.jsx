import { useEffect, useState } from 'react';
import './Navbar.css';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" onClick={() => setMenuOpen(false)}>
        {'< AF5 />'}
      </a>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
