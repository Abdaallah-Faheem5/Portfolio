import { useRef, useEffect } from 'react';
import { data } from '../data/index.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { AppIcon } from './AppIcon.jsx';
import './Experience.css';

export default function Experience() {
  const headerRef = useScrollReveal();
  const itemsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-label">// 03. experience</p>
          <h2 className="section-title">Journey So Far</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          {data.experience.map((item, i) => (
            <div
              key={i}
              className="timeline-item"
              ref={el => itemsRef.current[i] = el}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="timeline-dot">
                <span>
                  <AppIcon name={item.icon} />
                </span>
                <div className="dot-ring" />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-line" />
                <p className="timeline-date">{item.date}</p>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
