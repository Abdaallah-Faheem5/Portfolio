import { useRef } from 'react';
import { data } from '../data/index.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import './About.css';
import Me from '../assets/me.jpg';

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  return (
    <div
      ref={ref} className={`tilt-card ${className}`}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

export default function About() {
  const headerRef = useScrollReveal();
  const avatarRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-label">// 01. who_am_i</p>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="reveal" ref={avatarRef}>
            <TiltCard className="about-avatar-card">
              <div className="avatar-orb">
                <img src={Me} alt="Abdullah Amlih portrait" className="avatar-image" />
              </div>
              <div className="avatar-ring" />
              <div className="avatar-ring ring-2" />
              <div className="avatar-glow" />
            </TiltCard>
          </div>

          <div className="about-content reveal" ref={contentRef}>
            <h3 className="about-heading">
              Full-Stack Engineer.<br />
              <span className="gold-text">Problem Solver. Builder.</span>
            </h3>
            <p className="about-desc">
              Software Engineering student at Al-Zaytoonah University (graduating Jan 2027),
              with real-world internship experience at Dot Jordan. I build responsive frontends
              and scalable backend systems — from dynamic React UIs to RESTful APIs with
              Node.js, Express, and both SQL and NoSQL databases.
            </p>
            <p className="about-desc">
              I competed in JCPC and AmmanCPC, shaping how I think about complex problems —
              systematically, efficiently, and without shortcuts.
            </p>

            <div className="about-stats">
              {data.stats.map((s, i) => (
                <TiltCard key={i} className="stat-card">
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
