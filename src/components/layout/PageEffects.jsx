import { useEffect, useRef } from 'react';
import styles from './PageEffects.module.css';

export default function PageEffects() {
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = null;
    const updateProgress = () => {
      frame = null;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      if (progressRef.current) progressRef.current.style.width = progress + '%';
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className={styles['scroll-progress']} aria-hidden="true" />
      {/* Background */}
      <div className={styles['bg-orbs']} aria-hidden="true">
        <div className={`${styles.orb} ${styles['orb-1']}`} />
        <div className={`${styles.orb} ${styles['orb-2']}`} />
        <div className={`${styles.orb} ${styles['orb-3']}`} />
      </div>
      <div className={styles['bg-grid']} aria-hidden="true" />
    </>
  );
}
