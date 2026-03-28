import { useEffect, useRef, useState } from 'react';
import { data } from '../data/index.js';
import './Hero.css';

const WORDS = ['Full-Stack Engineer',' Bacend Engineer', 'Frontend Engineer'];

function normalizeUrl(url) {
  if (!url || url === '#') return null;
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url)) return url;
  return `https://${url}`;
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [firstName, ...restName] = data.personal.name.split(' ');
  const lastName = restName.join(' ') || firstName;
  const cvUrl = normalizeUrl(data.personal.cv);
  const cvExternal = isExternalUrl(cvUrl || '');

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < count; i += 1) {
        for (let j = i + 1; j < count; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,175,55,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${particle.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    const word = WORDS[wordIdx];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((index) => (index + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  // 3D depth from pointer movement
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--mx', x.toFixed(3));
      hero.style.setProperty('--my', y.toFixed(3));
    };

    const reset = () => {
      hero.style.setProperty('--mx', '0');
      hero.style.setProperty('--my', '0');
    };

    hero.addEventListener('pointermove', handleMove);
    hero.addEventListener('pointerleave', reset);

    return () => {
      hero.removeEventListener('pointermove', handleMove);
      hero.removeEventListener('pointerleave', reset);
    };
  }, []);

  // Magnetic CTA
  const handleMagnet = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
    button.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`;
  };

  const resetMagnet = (event) => {
    event.currentTarget.style.transform = '';
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-3d-scene" aria-hidden="true">
        <div className="scene-ring scene-ring-1" />
        <div className="scene-ring scene-ring-2" />
        <div className="scene-ring scene-ring-3" />
        <div className="scene-core" />

        <div className="scene-cube">
          <span className="cube-face cube-front">JS</span>
          <span className="cube-face cube-back">API</span>
          <span className="cube-face cube-right">UI</span>
          <span className="cube-face cube-left">DB</span>
          <span className="cube-face cube-top">NODE</span>
          <span className="cube-face cube-bottom">REACT</span>
        </div>

       
      </div>

      <div className="hero-content">
        <div className="hero-code-column">
          <div className="hero-code">
            <div className="code-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="code-filename">developer.config.js</span>
            </div>
            <pre className="code-body">
{`const `}<span className="c-var">developer</span>{` = {
  `}<span className="c-prop">name</span>{`:     `}<span className="c-str">"${data.personal.name}"</span>{`,
  `}<span className="c-prop">location</span>{`: `}<span className="c-str">"${data.personal.location}"</span>{`,
  `}<span className="c-prop">stack</span>{`:    [`}<span className="c-str">"React"</span>{`, `}<span className="c-str">"Node.js"</span>{`, `}<span className="c-str">"MongoDB"</span>{`],
  `}<span className="c-prop">status</span>{`:   `}<span className="c-ok">"open_to_work"</span>{`,
};`}
            </pre>
          </div>
        </div>

        <div className="hero-main">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            <span className="hero-name-first">{firstName}</span>
            <span className="hero-name-last">{lastName}</span>
          </h1>

          <p className="hero-typewriter">
            // <span className="typewriter-text">{displayed}</span>
            <span className="typewriter-cursor">|</span>
          </p>

          <p className="hero-desc">
            {data.personal.subtitle}
            <br />
            {data.personal.desc}
          </p>

          <div className="hero-cta">
            <a
              href="#projects"
              className="btn-primary"
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
            >
              View Work
            </a>
            <a href="#contact" className="btn-ghost">Contact Me</a>
            {cvUrl && (
              <a
                href={cvUrl}
                className="btn-ghost"
                target={cvExternal ? '_blank' : undefined}
                rel={cvExternal ? 'noreferrer' : undefined}
              >
                Download CV
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
