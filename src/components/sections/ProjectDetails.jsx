import { useEffect } from 'react';
import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './ProjectDetails.module.css';
import PreferenceControls from '../layout/PreferenceControls.jsx';

export default function ProjectDetails() {
  const { data, t, language } = usePortfolio();
  const match = window.location.hash.match(/^#projects\/([^/]+)\/?$/);
  const index = data.projects.findIndex((item) => item.slug === match?.[1]);
  const project = data.projects[index];

  useEffect(() => {
    document.title = project ? `${project.title} | ${data.hero.name}` : `${t('Project not found')} | ${data.hero.name}`;
  }, [project, language]);

  if (!project) {
    return (
      <main className={styles.page}>
        <div className={styles.pageToolbar}><a className={styles.back} href="/#projects"><span aria-hidden="true">{language === 'ar' ? '\u2192' : '\u2190'}</span> {t('Back to projects')}</a><PreferenceControls /></div>
        <header className={styles.hero}>
          <p className={styles.label}>404 / {t('PROJECT')}</p>
          <h1 className={styles.title}>{t('Project not found.')}</h1>
          <p className={styles.intro}>{t('This project link is unavailable. Browse the portfolio to find an existing project.')}</p>
        </header>
      </main>
    );
  }

  const previous = data.projects[index - 1];
  const next = data.projects[index + 1];
  const links = [{ label: t('Live Demo'), url: project.demo }, { label: 'GitHub', url: project.github }].filter(({ url }) => url && url !== '#');

  return (
    <main className={styles.page}>
      <div className={styles.pageToolbar}><a className={styles.back} href="/#projects"><span aria-hidden="true">{language === 'ar' ? '\u2192' : '\u2190'}</span> {t('Back to projects')}</a><PreferenceControls /></div>
      <header className={`${styles.hero} ${project.video ? styles.videoHero : ''}`}>
        {project.video && (
          <video className={styles.video} autoPlay muted loop playsInline preload="auto" poster={project.image}
            disablePictureInPicture disableRemotePlayback tabIndex={-1} aria-hidden="true">
            <source src={project.video.src} type={project.video.type} />
          </video>
        )}
        <div className={styles.heroContent}>
        <p className={styles.label}>{t('PROJECT')} / {String(index + 1).padStart(2, '0')}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.intro}>{project.shortDescription}</p>
        <dl className={styles.metadata}>
          {project.year && <div><dt>{t('Year')}</dt><dd>{project.year}</dd></div>}
          {project.role && <div><dt>{t('My role')}</dt><dd>{project.role}</dd></div>}
          <div><dt>{t('Primary technologies')}</dt><dd>{project.tech.slice(0, 3).join(' / ')}</dd></div>
        </dl>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="overview-heading">
        <h2 id="overview-heading" className={styles.sectionTitle}>{t('Overview')}</h2>
        <div className={styles.prose}>
          <p>{project.desc}</p>
          {project.purpose && <><h3>{t('Purpose')}</h3><p>{project.purpose}</p></>}
        </div>
      </section>

      {project.features?.length > 0 && (
        <section className={styles.section} aria-labelledby="features-heading">
          <h2 id="features-heading" className={styles.sectionTitle}>{t('What I built')}</h2>
          <ol className={styles.features}>
            {project.features.map((feature, featureIndex) => (
              <li key={feature}><span aria-hidden="true">{String(featureIndex + 1).padStart(2, '0')}</span><h3>{feature}</h3></li>
            ))}
          </ol>
        </section>
      )}

      {project.images?.length > 0 && (
        <section className={styles.gallerySection} aria-labelledby="images-heading">
          <h2 id="images-heading" className={styles.sectionTitle}>{t('A closer look')}</h2>
          <div id="project-gallery" className={styles.gallery} data-count={project.images.length}>
            {project.images.map((image, imageIndex) => (
              <figure key={image.src}>
                <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${image.alt} - ${t('open full image in a new tab')}`}>
                  <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
                </a>
                <figcaption className={styles.imageNumber} aria-hidden="true">{String(imageIndex + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.sectionTitle}>{t('Technology stack')}</h2>
        <ul className={styles.tags}>{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      </section>

      {links.length > 0 && (
        <section className={styles.section} aria-labelledby="links-heading">
          <h2 id="links-heading" className={styles.sectionTitle}>{t('Explore the project')}</h2>
          <div className={styles.actions}>
            {links.map(({ label, url }) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true">↗</span><span className={styles.srOnly}> ({t('opens in a new tab')})</span></a>)}
          </div>
        </section>
      )}

      <nav className={styles.navigation} aria-label={t('Project navigation')}>
        {previous && <a href={`/#projects/${previous.slug}`}><span>{language === 'ar' ? '\u2192' : '\u2190'} {t('Previous project')}</span><strong>{previous.title}</strong></a>}
        {next && <a className={styles.next} href={`/#projects/${next.slug}`}><span>{t('Next project')} {language === 'ar' ? '\u2190' : '\u2192'}</span><strong>{next.title}</strong></a>}
      </nav>
    </main>
  );
}
