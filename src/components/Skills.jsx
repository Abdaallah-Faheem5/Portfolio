import { useEffect, useRef } from 'react';
import { data } from '../data/index.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { AppIcon } from './AppIcon.jsx';
import './Skills.css';

function BentoCell({ skill }) {
  const ref = useRef(null);
  const barRef = useRef(null);

  /* 3D tilt */
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  /* Bar animation on enter viewport */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { bar.style.width = skill.level + '%'; }, 300);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level]);

  const spanClass = skill.span === '2x2' ? 'cell-2x2' : skill.span === '2x1' ? 'cell-2x1' : '';

  return (
    <div
      ref={ref}
      className={`bento-cell ${spanClass}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="cell-top-line" />
      <span className="skill-icon">
        <AppIcon name={skill.icon} />
      </span>
      <p className="skill-name">{skill.name}</p>
      <p className="skill-desc">{skill.desc}</p>
      {skill.tags.length > 0 && (
        <div className="skill-tags">
          {skill.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      )}
      <div className="skill-bar">
        <div ref={barRef} className="skill-fill" style={{ width: 0 }} />
      </div>
      <span className="skill-level-badge">{skill.level}%</span>
    </div>
  );
}

export default function Skills() {
  const headerRef = useScrollReveal();

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-label">// 02. skill_set</p>
          <h2 className="section-title">What I Build With</h2>
        </div>

        <div className="bento-grid">
          {data.skills.map((s, i) => <BentoCell key={i} skill={s} />)}

          {/* Quote cell */}
          <div className="bento-cell cell-quote">
            <div className="cell-top-line" />
            <p className="quote-mark">"</p>
            <p className="quote-body">The best code is<br />invisible to the user.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
