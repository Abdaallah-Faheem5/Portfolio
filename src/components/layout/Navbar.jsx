import { useEffect, useRef, useState } from 'react';
import { data } from '../../data/index.js';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const sections = ['hero', ...data.navigation.map((link) => link.toLowerCase())]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const visible = new Set();
    const links = nav.querySelectorAll('a[href^="#"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      const current = sections.filter((section) => visible.has(section)).pop();
      if (!current) return;

      nav.dataset.scrolled = String(current.id !== 'hero');
      links.forEach((link) => {
        if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-72px 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia('(min-width: 769px)');
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <nav ref={navRef} className={styles.navbar} aria-label="Primary navigation" data-open={menuOpen}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={closeMenu} aria-label="Back to introduction">
          {data.branding.navbar}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles['toggle-label']}>Menu</span>
          <span className={styles['toggle-icon']} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <ul id="mobile-menu" className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {data.navigation.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={closeMenu}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
