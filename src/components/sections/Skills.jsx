import { data } from '../../data/index.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Skills.module.css';
import shared from '../../styles/sections.module.css';

function BentoCell({ skill }) {
  const spanClass = skill.span === '2x2' ? styles['cell-2x2'] : skill.span === '2x1' ? styles['cell-2x1'] : '';

  return (
    <div className={`${styles['bento-cell']} ${spanClass}`}>
      <div className={styles['cell-top-line']} />
      <span className={styles['skill-icon']}>
        <AppIcon name={skill.icon} />
      </span>
      <h3 className={styles['skill-name']}>{skill.name}</h3>
      <p className={styles['skill-desc']}>{skill.desc}</p>
      {skill.tags.length > 0 && (
        <div className={styles['skill-tags']}>
          {skill.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
      )}

    </div>
  );
}

export default function Skills() {
  const headerRef = useScrollReveal();

  return (
    <section id="skills" className={`${shared.section} ${styles['skills-section']}`} aria-labelledby="skills-heading">
      <div className={shared.container}>
        <div className={`${styles['section-header']} ${shared.reveal}`} ref={headerRef}>
          <p className={styles['section-label']}>{data.sections.skills.label}</p>
          <h2 id="skills-heading" className={styles['section-title']}>{data.sections.skills.title}</h2>
        </div>

        <div className={styles['bento-grid']}>
          {data.skills.map((skill) => <BentoCell key={skill.name} skill={skill} />)}

          {/* Quote cell */}
          <div className={`${styles['bento-cell']} ${styles['cell-quote']}`}>
            <div className={styles['cell-top-line']} />
            <p className={styles['quote-mark']} aria-hidden="true">"</p>
            <p className={styles['quote-body']}>{data.skillQuote[0]}<br />{data.skillQuote[1]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
