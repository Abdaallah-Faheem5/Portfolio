import { data } from '../../data/index.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import styles from './Experience.module.css';
import shared from '../../styles/sections.module.css';

export default function Experience() {
  const headerRef = useScrollReveal();

  return (
    <section id="experience" className={`${shared.section} ${styles['experience-section']}`} aria-labelledby="experience-heading">
      <div className={shared.container}>
        <header className={`${styles.header} ${shared.reveal}`} ref={headerRef}>
          <p className={styles.label}>{data.sections.experience.label}</p>
          <h2 id="experience-heading" className={styles.heading}>{data.sections.experience.title}</h2>
        </header>
        <ol className={styles.progression}>
          {data.experience.map((item) => (
            <li key={`${item.title}-${item.date}`} className={styles.entry}>
              <div className={styles.metadata}>
                <p className={styles.period}>{item.date}</p>
                <p className={styles.kind}>{item.kind}</p>
              </div>
              <div className={styles.details}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.organization}>{item.company}</p>
                <p className={styles.description}>{item.desc}</p>
                <ul className={styles.tags} aria-label={`${item.title} focus`}>
                  {item.focus.map((tag) => <li key={tag} className={styles.tag}>{tag}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
