import { useRef, useEffect } from 'react';
import { data } from '../../data/index.js';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Experience.module.css';
import shared from '../../styles/sections.module.css';

export default function Experience() {
  const headerRef = useScrollReveal();
  const itemsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    itemsRef.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className={`${shared.section} ${styles['experience-section']}`}>
      <div className={shared.container}>
        <div className={`${shared['section-header']} ${shared.reveal}`} ref={headerRef}>
          <p className={shared['section-label']}>{data.sections.experience.label}</p>
          <h2 className={shared['section-title']}>{data.sections.experience.title}</h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles['timeline-line']} />

          {data.experience.map((item, i) => (
            <div
              key={i}
              className={styles['timeline-item']}
              ref={el => itemsRef.current[i] = el}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles['timeline-dot']}>
                <span>
                  <AppIcon name={item.icon} />
                </span>
                <div className={styles['dot-ring']} />
              </div>
              <div className={styles['timeline-card']}>
                <div className={styles['timeline-card-line']} />
                <p className={styles['timeline-date']}>{item.date}</p>
                <h3 className={styles['timeline-title']}>{item.title}</h3>
                <p className={styles['timeline-company']}>{item.company}</p>
                <p className={styles['timeline-desc']}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
