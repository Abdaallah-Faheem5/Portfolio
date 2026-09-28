import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './WelcomeIntro.module.css';
import knightVideo from '../../assets/intro/arabian-knight-6s.mp4';
import knightPoster from '../../assets/intro/arabian-knight-poster.png';
import BrandMark from '../BrandMark.jsx';

const storageKey = 'portfolio-welcome-seen-v5';

function initialPhase() {
  try {
    return sessionStorage.getItem(storageKey) ? 'done' : 'riding';
  } catch {
    return 'riding';
  }
}

export default function WelcomeIntro({ children }) {
  const { data, language } = usePortfolio();
  const [phase, setPhase] = useState(initialPhase);
  const skipRef = useRef(null);
  const contentRef = useRef(null);
  const wasVisible = useRef(phase !== 'done');
  const visible = phase !== 'done';
  const arabic = language === 'ar';
  const nameParts = 'Abdallah Faheem'.split(' ');
  const firstName = nameParts.slice(0, -1).join(' ') || nameParts[0];
  const surname = nameParts.length > 1 ? nameParts.at(-1) : '';

  useEffect(() => {
    if (phase === 'done') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      setPhase(phase === 'riding' ? 'welcome' : phase === 'welcome' ? 'leaving' : 'done');
    }, phase === 'riding' ? (reduced ? 0 : 12000) : phase === 'welcome' ? (reduced ? 1600 : 2700) : (reduced ? 0 : 800));
    return () => window.clearTimeout(timer);
  }, [phase]);

  useLayoutEffect(() => {
    if (!visible) {
      if (wasVisible.current) {
        try { sessionStorage.setItem(storageKey, 'true'); } catch { /* Optional persistence. */ }
        contentRef.current?.focus({ preventScroll: true });
        wasVisible.current = false;
      }
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    const onKey = (event) => {
      if (event.key === 'Escape') setPhase('leaving');
      // The intro has one interactive control; keep keyboard focus on it.
      if (event.key === 'Tab') { event.preventDefault(); skipRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  return (
    <>
      <div ref={contentRef} className={styles.content} tabIndex={-1}
        inert={visible ? '' : undefined} aria-hidden={visible ? true : undefined}>
        {children}
      </div>
      {visible && (
        <div className={styles.intro} data-phase={phase} data-leaving={phase === 'leaving'}
          role="dialog" aria-modal="true" aria-labelledby="welcome-name" aria-describedby="welcome-role">
          <div className={styles.backdrop} aria-hidden="true"><span>AF</span></div>
          <div className={styles.cinema} aria-hidden="true">
            <video className={styles.film} src={knightVideo} poster={knightPoster}
              autoPlay muted playsInline preload="auto"
              ref={(video) => {
                if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                const revealAt = Number.isFinite(video.duration) ? Math.max(0, video.duration - 2.5) : 3.5;
                if (phase === 'riding' && video.currentTime >= revealAt) setPhase('welcome');
              }}
              onEnded={() => { if (phase === 'riding') setPhase('welcome'); }}
              onError={() => { if (phase === 'riding') setPhase('welcome'); }} />
            <div className={styles.shade} />
          </div>
          <div className={styles.particles} aria-hidden="true">
            {Array.from({ length: 26 }, (_, i) => <i key={i} style={{
              '--x': `${(i * 37) % 100}%`, '--y': `${25 + (i * 17) % 65}%`,
              '--delay': `${(i % 7) * -.47}s`, '--travel': `${30 + (i % 5) * 20}px`,
            }} />)}
          </div>
          <div className={styles.topline}>
            <span className={styles.brand} dir="ltr"><BrandMark label={data.branding.navbar} /></span>
            <span className={styles.edition}>{arabic ? 'أهلًا بك في موقعي' : 'WELCOME TO MY PORTFOLIO'}</span>
          </div>
          <div className={styles.identity}>
            <div className={styles.seal} aria-hidden="true"><span dir="ltr">AF<span className={styles.sealDot}>.</span></span></div>
            <p className={styles.eyebrow}>{arabic ? 'مرحبًا، أنا' : 'HELLO, I’M'}</p>
            <h1 id="welcome-name" className={styles.name} lang="en" dir="ltr">
              <span className={styles.firstName}>{firstName}</span>{' '}
              {surname && <span className={styles.surname}>{surname}</span>}
            </h1>
            <p id="welcome-role" className={styles.role} lang="en" dir="ltr">Software Engineering</p>
            <div className={styles.rule} aria-hidden="true"><span /></div>
            <p className={styles.statement}>{data.hero.headline.join(' ')}</p>
          </div>
          <div className={styles.bottomline}>
            <span className={styles.note}>{arabic ? 'برمجة بفكرة. وتفاصيل تصنع الفرق.' : 'Code with purpose. Details that matter.'}</span>
            <button ref={skipRef} type="button" className={styles.skip} onClick={() => setPhase('leaving')}>
              {arabic ? 'دخول الموقع' : 'Enter portfolio'} <span aria-hidden="true">{arabic ? '←' : '→'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
