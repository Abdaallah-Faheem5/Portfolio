import styles from './BrandMark.module.css';

export default function BrandMark({ label }) {
  const [before, after] = label.split('/');
  return (
    <span className={styles.mark} dir="ltr" aria-label="AF5">
      <span aria-hidden="true">{before}</span>
      <svg className={styles.sword} viewBox="0 0 24 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M9 23C13 18 18 11 21 2C20 12 16 20 12 25Z" fill="currentColor" />
        <path d="M6 21L14 27M9 25L5 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="4.5" cy="30" r="1.5" fill="currentColor" />
      </svg>
      <span aria-hidden="true">{after}</span>
    </span>
  );
}
