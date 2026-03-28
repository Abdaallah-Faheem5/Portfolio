import { useEffect, useRef } from 'react';
import { data } from '../data/index.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { AppIcon } from './AppIcon.jsx';
import './Projects.css';

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
          el.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMove = (event) => {
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
    cardRef.current.classList.remove('hovered');
  };

  const handleEnter = () => {
    if (cardRef.current) cardRef.current.classList.add('hovered');
  };

  return (
    <div
      ref={cardRef}
      className={`project-card ${project.featured ? 'featured' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
    >
      <div className="card-glow" />
      <div className="card-top-line" />

      <div className="project-header">
        <span className="project-icon">
          <AppIcon name={project.icon} />
        </span>
        <div className="project-links">
          {demoUrl && (
            <a
              href={demoUrl}
              className="proj-link"
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
              className="proj-link"
              title="GitHub"
              target={isExternalUrl(githubUrl) ? '_blank' : undefined}
              rel={isExternalUrl(githubUrl) ? 'noreferrer' : undefined}
            >
              <AppIcon name="GITHUB" />
            </a>
          )}
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>

      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech} className="tag">{tech}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useScrollReveal();

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-label">// 04. projects</p>
          <h2 className="section-title">Things I&apos;ve Built</h2>
        </div>

        <div className="projects-grid">
          {data.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
