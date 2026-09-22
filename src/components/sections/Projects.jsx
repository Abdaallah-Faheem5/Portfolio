import { useEffect, useRef } from 'react';
import { data } from '../../data/index.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Projects.module.css';
import shared from '../../styles/sections.module.css';

function normalizeUrl(url) {
  if (!url || url === '#') return null;
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url)) return url;
  return `https://${url}`;
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null);
  const demoUrl = normalizeUrl(project.demo);
  const githubUrl = normalizeUrl(project.github);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(12px)`;
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
    cardRef.current.classList.remove(styles.hovered);
  };

  const handleEnter = () => {
    if (cardRef.current) cardRef.current.classList.add(styles.hovered);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles['project-card']} ${project.featured ? styles.featured : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
    >
      <div className={styles['card-glow']} />
      <div className={styles['card-top-line']} />

      {project.image && (
        <div className={styles['project-media']}>
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className={styles['project-image']}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className={styles['project-header']}>
        <span className={styles['project-icon']}>
          <AppIcon name={project.icon} />
        </span>
        <div className={styles['project-links']}>
          {demoUrl && (
            <a
              href={demoUrl}
              className={styles['proj-link']}
              title="Live Demo"
              target={isExternalUrl(demoUrl) ? '_blank' : undefined}
              rel={isExternalUrl(demoUrl) ? 'noreferrer' : undefined}
            >
              <AppIcon name="01" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              className={styles['proj-link']}
              title="GitHub"
              target={isExternalUrl(githubUrl) ? '_blank' : undefined}
              rel={isExternalUrl(githubUrl) ? 'noreferrer' : undefined}
            >
              <AppIcon name="GITHUB" />
            </a>
          )}
        </div>
      </div>

      <h3 className={styles['project-title']}>{project.title}</h3>
      <p className={styles['project-desc']}>{project.desc}</p>

      <div className={styles['project-tech']}>
        {project.tech.map((tech) => (
          <span key={tech} className={shared.tag}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useScrollReveal();

  return (
    <section id="projects" className={`${shared.section} ${styles['projects-section']}`}>
      <div className={shared.container}>
        <div className={`${shared['section-header']} ${shared.reveal}`} ref={headerRef}>
          <p className={shared['section-label']}>{data.sections.projects.label}</p>
          <h2 className={shared['section-title']}>{data.sections.projects.title}</h2>
        </div>

        <div className={styles['projects-grid']}>
          {data.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
