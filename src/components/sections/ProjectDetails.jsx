import { useEffect } from 'react';
import { data } from '../../data/index.js';
import styles from './ProjectDetails.module.css';

export default function ProjectDetails() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  const index = data.projects.findIndex((item) => item.slug === match?.[1]);
  const project = data.projects[index];

  useEffect(() => {
    document.title = project ? `${project.title} | ${data.hero.name}` : `Project not found | ${data.hero.name}`;
  }, [project]);

  if (!project) {
    return (
      <main className={styles.page}>
        <a className={styles.back} href="/#projects">← Back to projects</a>
        <header className={styles.hero}>
          <p className={styles.label}>404 / PROJECT</p>
          <h1 className={styles.title}>Project not found.</h1>
          <p className={styles.intro}>This project link is unavailable. Browse the portfolio to find an existing project.</p>
        </header>
      </main>
    );
  }

  const previous = data.projects[index - 1];
  const next = data.projects[index + 1];
  const links = [{ label: 'Live Demo', url: project.demo }, { label: 'GitHub', url: project.github }].filter(({ url }) => url && url !== '#');

  return (
    <main className={styles.page}>
      <a className={styles.back} href="/#projects">← Back to projects</a>
      <header className={styles.hero}>
        <p className={styles.label}>PROJECT / {String(index + 1).padStart(2, '0')}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.intro}>{project.shortDescription}</p>
        <dl className={styles.metadata}>
          {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
          {project.role && <div><dt>My role</dt><dd>{project.role}</dd></div>}
          <div><dt>Primary technologies</dt><dd>{project.tech.slice(0, 3).join(' / ')}</dd></div>
        </dl>
        {project.video && (
          <video className={styles.video} controls playsInline preload="none" poster={project.image} aria-label={`${project.title} demonstration`}>
            <source src={project.video.src} type={project.video.type} />
            {project.video.captions && <track kind="captions" src={project.video.captions} srcLang="en" label="English" default />}
            <a href={project.video.src}>Download the project video</a>
          </video>
        )}
      </header>

      <section className={styles.section} aria-labelledby="overview-heading">
        <h2 id="overview-heading" className={styles.sectionTitle}>Overview</h2>
        <div className={styles.prose}>
          <p>{project.desc}</p>
          {project.purpose && <><h3>Purpose</h3><p>{project.purpose}</p></>}
        </div>
      </section>

      {project.features?.length > 0 && (
        <section className={styles.section} aria-labelledby="features-heading">
          <h2 id="features-heading" className={styles.sectionTitle}>What I built</h2>
          <ol className={styles.features}>
            {project.features.map((feature, featureIndex) => (
              <li key={feature}><span aria-hidden="true">{String(featureIndex + 1).padStart(2, '0')}</span><h3>{feature}</h3></li>
            ))}
          </ol>
        </section>
      )}

      {project.images?.length > 0 && (
        <section className={styles.gallerySection} aria-labelledby="images-heading">
          <h2 id="images-heading" className={styles.sectionTitle}>A closer look</h2>
          <div className={styles.gallery} data-count={project.images.length}>
            {project.images.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.sectionTitle}>Technology stack</h2>
        <ul className={styles.tags}>{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      </section>

      {links.length > 0 && (
        <section className={styles.section} aria-labelledby="links-heading">
          <h2 id="links-heading" className={styles.sectionTitle}>Explore the project</h2>
          <div className={styles.actions}>
            {links.map(({ label, url }) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>)}
          </div>
        </section>
      )}

      <nav className={styles.navigation} aria-label="Project navigation">
        {previous && <a href={`/projects/${previous.slug}`}><span>← Previous project</span><strong>{previous.title}</strong></a>}
        {next && <a className={styles.next} href={`/projects/${next.slug}`}><span>Next project →</span><strong>{next.title}</strong></a>}
      </nav>
    </main>
  );
}
