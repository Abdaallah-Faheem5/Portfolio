import { data } from '../../data/index.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import styles from './About.module.css';
import shared from '../../styles/sections.module.css';
import portrait from '../../assets/me.jpg';

export default function About() {
  const profileRef = useScrollReveal();
  const narrativeRef = useScrollReveal();

  return (
    <section id="about" className={`${shared.section} ${styles.about}`} aria-labelledby="about-heading">
      <div className={shared.container}>
        <div className={styles.layout}>
          <figure ref={profileRef} className={`${shared.reveal} ${styles.portrait}`}>
            <div className={styles['portrait-frame']}>
              <img
                src={portrait}
                alt={`Portrait of ${data.hero.name}`}
                width="1248"
                height="1600"
                loading="lazy"
                decoding="async"
                className={styles['portrait-image']}
              />
            </div>
            <figcaption className={styles['portrait-caption']}>01 / PROFILE</figcaption>
          </figure>

          <div ref={narrativeRef} className={`${shared.reveal} ${styles.narrative}`}>
            <div className={styles.chapter}>
              <p>{data.sections.about.label}</p>
              <span aria-hidden="true">{data.sections.about.title}</span>
            </div>

            <h2 id="about-heading" className={styles.heading}>
              {data.about.heading}{' '}
              <span>{data.about.accent}</span>
            </h2>

            <div className={styles.biography}>
              {data.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <dl className={styles.details}>
              <div>
                <dt>Based in</dt>
                <dd>{data.personal.location}</dd>
              </div>
              {data.about.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
            <h3 className={styles['approach-label']}>{data.about.approachLabel}</h3>
            <ol className={styles.approach} role="list">
              {data.about.approach.map((item) => (
                <li key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>

            <p className={styles.focus}>
              <span>{data.about.focusLabel}</span>
              {data.about.focus}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
