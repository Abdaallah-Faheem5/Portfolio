import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './WelcomeIntro.module.css';

const storageKey = 'portfolio-welcome-seen';

function initialPhase() {
  try {
    return sessionStorage.getItem(storageKey) ? 'done' : 'welcome';
  } catch {
    return 'welcome';
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

  useEffect(() => {
    if (phase === 'done') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => {
      setPhase(phase === 'welcome' ? 'leaving' : 'done');
    }, phase === 'welcome' ? (reduced ? 1000 : 2200) : (reduced ? 0 : 320));
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
        <div className={styles.intro} data-leaving={phase === 'leaving'}
          role="dialog" aria-modal="true" aria-labelledby="welcome-name" aria-describedby="welcome-role">
          <div className={styles.topline}>
            <span className={styles.brand} dir="ltr">{data.branding.navbar}</span>
            <span className={styles.edition}>{arabic ? 'أهلًا بك في موقعي' : 'WELCOME TO MY PORTFOLIO'}</span>
          </div>
          <div className={styles.identity}>
            <p className={styles.eyebrow}>{arabic ? 'مرحبًا، أنا' : 'HELLO, I’M'}</p>
            <h1 id="welcome-name" className={styles.name}>{data.hero.name}</h1>
            <p id="welcome-role" className={styles.role}>{data.hero.eyebrow}</p>
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
