import { usePortfolio } from '../../context/Preferences.jsx';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Projects.module.css';
import shared from '../../styles/sections.module.css';

function ProjectCard({ project }) {
  const { t, language } = usePortfolio();
  const cardRef = useScrollReveal();
  const href = `/#projects/${project.slug}`;

  return (
    <article ref={cardRef} className={`${styles['project-card']} ${shared.reveal}`}>
      <a className={styles['project-media']} href={href} tabIndex={-1} aria-hidden="true">
        <img src={project.image} alt="" className={styles['project-image']} loading="lazy" decoding="async"
          width={project.images[0].width} height={project.images[0].height} />
      </a>
      <div className={styles['project-header']}>
        <span className={styles['project-icon']}><AppIcon name={project.icon} /></span>
        <div className={styles['project-links']}>
          {project.demo && <a href={project.demo} className={styles['proj-link']} aria-label={`${t('Live Demo')}: ${project.title} (${t('opens in a new tab')})`} target="_blank" rel="noopener noreferrer"><AppIcon name="01" /></a>}
          {project.github && <a href={project.github} className={styles['proj-link']} aria-label={`GitHub: ${project.title} (${t('opens in a new tab')})`} target="_blank" rel="noopener noreferrer"><AppIcon name="GITHUB" /></a>}
        </div>
      </div>
      <h3 className={styles['project-title']}><a href={href}>{project.title}</a></h3>
      <p className={styles['project-desc']}>{project.shortDescription}</p>
      <ul className={styles['project-tech']}>
        {project.tech.slice(0, 3).map((tech) => <li key={tech}>{tech}</li>)}
      </ul>
      <a className={styles['view-project']} href={href} aria-label={`${t('View Project')}: ${project.title}`}>{t('View Project')} <span aria-hidden="true">{language === 'ar' ? '\u2196' : '\u2197'}</span></a>
    </article>
  );
}

export default function Projects() {
  const { data } = usePortfolio();
  const headerRef = useScrollReveal();
  return (
    <section id="projects" className={`${shared.section} ${styles['projects-section']}`} aria-labelledby="projects-heading">
      <div className={shared.container}>
        <header className={`${styles['section-header']} ${shared.reveal}`} ref={headerRef}>
          <p className={styles['section-label']}>{data.sections.projects.label}</p>
          <h2 id="projects-heading" className={styles['section-title']}>{data.sections.projects.title}</h2>
        </header>
        <div className={styles['projects-grid']}>
          {data.projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
