import { useEffect, useRef, useState } from 'react';
import { data } from '../../data/index.js';
import styles from './Hero.module.css';

function normalizeUrl(url) {
  if (!url || url === '#') return null;
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url)) return url;
  return `https://${url}`;
}

export default function Hero() {
  const heroRef = useRef(null);
  const anchorRef = useRef(null);
  const layerRef = useRef(null);
  const stageRef = useRef(null);
  const controlRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const cvUrl = normalizeUrl(data.personal.cv);
  const cvExternal = /^https?:\/\//i.test(cvUrl || '');

  useEffect(() => {
    const hero = heroRef.current;
    const anchor = anchorRef.current;
    const layer = layerRef.current;
    const stage = stageRef.current;
    const visual = anchor.parentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, laptop = null, frame = null, userPaused = false;
    let bounds = { left: 0, top: 0, width: 1, height: 1 };
    let inView = true;

    const updateRunning = () => {
      laptop?.setRunning(!document.hidden && !reduced.matches && !userPaused && inView);
    };
    const update = () => {
      frame = null;
      const heroTop = hero.getBoundingClientRect().top;
      const progress = reduced.matches ? 0 : Math.min(1, Math.max(0, -heroTop / (hero.offsetHeight * 0.85)));
      const eased = progress * progress * (3 - 2 * progress);
      const mobile = window.innerWidth <= 768;
      const x = bounds.left + (window.innerWidth - bounds.width * 0.82 - bounds.left) * eased;
      const y = (bounds.top - window.scrollY) * (1 - eased) + window.innerHeight * 0.25 * eased;
      stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1 + eased * (mobile ? 0.08 : 0.16)})`;
      layer.style.opacity = String(1 - eased * (mobile ? 0.66 : 0.58));
      hero.style.setProperty('--hero-exit-x', `${-Math.min(window.innerWidth * 0.25, 240) * eased}px`);
      hero.style.setProperty('--hero-exit-opacity', String(Math.max(0, 1 - progress * 1.6)));
      hero.dataset.departed = String(progress >= 0.64);
      inView = y + bounds.height > 0 && y < window.innerHeight;
      if (reduced.matches) layer.style.visibility = inView ? 'visible' : 'hidden';
      else layer.style.visibility = 'visible';
      updateRunning();
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const rect = anchor.getBoundingClientRect();
      bounds = { left: rect.left, top: rect.top + window.scrollY, width: rect.width, height: rect.height };
      stage.style.width = `${rect.width}px`;
      stage.style.height = `${rect.height}px`;
      laptop?.resize(rect.width, rect.height);
      schedule();
    };
    const onMotionChange = () => { if (reduced.matches) laptop?.reset(); schedule(); };
    const onVisibility = () => updateRunning();
    controlRef.current = (value) => { userPaused = value; updateRunning(); };

    const resize = new ResizeObserver(measure);
    resize.observe(anchor);
    resize.observe(hero);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onMotionChange);
    measure();

    import('./heroLaptop.js').then(({ createHeroLaptop }) => {
      if (disposed) return;
      laptop = createHeroLaptop(stage, { name: data.hero.name, location: data.personal.location });
      if (!laptop) {
        anchor.dataset.failed = 'true';
        return;
      }
      measure();
      layer.dataset.ready = 'true';
      anchor.dataset.ready = 'true';
      visual.dataset.ready = 'true';
      schedule();
    }).catch(() => {
      if (disposed) return;
      laptop?.dispose(); laptop = null;
      anchor.dataset.failed = 'true';
      delete layer.dataset.ready;
      delete anchor.dataset.ready;
      delete visual.dataset.ready;
    });

    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onMotionChange);
      laptop?.dispose();
      controlRef.current = null;
      delete layer.dataset.ready;
      delete anchor.dataset.ready;
      delete visual.dataset.ready;
      hero.style.removeProperty('--hero-exit-x');
      delete anchor.dataset.failed;
      hero.style.removeProperty('--hero-exit-opacity');
      delete hero.dataset.departed;
    };
  }, []);

  const toggleRotation = () => {
    const next = !paused;
    setPaused(next);
    controlRef.current?.(next);
  };

  return (
    <section ref={heroRef} id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div ref={layerRef} className={styles['laptop-layer']} aria-hidden="true">
        <div ref={stageRef} className={styles['laptop-stage']} />
      </div>
      <div className={styles.container}>
        <div className={styles.composition}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>{data.hero.eyebrow}</p>

            <h1 id="hero-heading" className={styles.headline}>
              {data.hero.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className={styles.surname}>{data.hero.name.split(' ').at(-1)}</span>
            </h1>

            <p className={styles.description}>{data.hero.headline.join(' ')}</p>

            <div className={styles.actions}>
              <a href="#projects" className={styles.primary}>
                {data.hero.workLabel}<span aria-hidden="true">↗</span>
              </a>
              <a href="#contact" className={styles.secondary}>
                {data.hero.contactLabel}<span aria-hidden="true">→</span>
              </a>
            </div>

            {cvUrl && (
              <a
                href={cvUrl}
                className={styles.resume}
                target={cvExternal ? '_blank' : undefined}
                rel={cvExternal ? 'noreferrer' : undefined}
              >
                {data.hero.cvLabel}<span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <div className={styles.visual}>
            <div className={styles['visual-label']} aria-hidden="true">
              <span>01 / Under the hood</span><span className={styles.cross}>+</span>
            </div>
            <div ref={anchorRef} className={styles['laptop-anchor']} aria-hidden="true">
            <div className={styles.editor}>
              <div className={styles['editor-header']}>
                <span className={styles['file-mark']}>/</span>
                <span>developer.config.js</span>
                <span className={styles.language}>JS</span>
              </div>
              <pre className={styles.code}><code>
                <span className={styles['code-line']}><span className={styles.keyword}>const</span>{' developer = {'}</span>
                <span className={styles['code-line']}>{'  name: '}<span className={styles.string}>{`"${data.hero.name}"`}</span>,</span>
                <span className={styles['code-line']}>{'  location: '}<span className={styles.string}>{`"${data.personal.location}"`}</span>,</span>
                <span className={styles['code-line']}>{'  stack: ['}</span>
                <span className={styles['code-line']}>{'    '}<span className={styles.string}>"React"</span>,</span>
                <span className={styles['code-line']}>{'    '}<span className={styles.string}>"Node.js"</span>,</span>
                <span className={styles['code-line']}>{'    '}<span className={styles.string}>"MongoDB"</span></span>
                <span className={styles['code-line']}>{'  ],'}</span>
                <span className={styles['code-line']}>{'  status: '}<span className={styles.string}>{`"${data.personal.status}"`}</span></span>
                <span className={styles['code-line']}>{'};'}</span>
              </code></pre>
              <div className={styles.flow}>
                <span>Interface</span><span className={styles.connector}>→</span>
                <span>API</span><span className={styles.connector}>→</span><span>Data</span>
              </div>
            </div>
            </div>
            <button type="button" className={styles['rotation-toggle']} onClick={toggleRotation} aria-pressed={paused} aria-label="Pause laptop rotation">
              {paused ? 'Resume rotation' : 'Pause rotation'}
            </button>
            <p className={styles['visual-note']} aria-hidden="true">Frontend precision. Backend clarity.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.availability}><span aria-hidden="true" />{data.hero.availability}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>
    </section>
  );
}
