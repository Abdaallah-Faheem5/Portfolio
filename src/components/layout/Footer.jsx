import { data } from '../../data/index.js';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = data.contactMethods.filter(({ field }) =>
    ['linkedin', 'github'].includes(field) && data.personal[field] && data.personal[field] !== '#');
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-inner']}>
        <div className={styles.identity}>
          <a className={styles['footer-logo']} href="#hero" aria-label="Back to introduction">{data.branding.footer}</a>
          <p className={styles.role}>{data.personal.title}</p>
        </div>
        <nav className={styles.socials} aria-label="Footer social links">
          {socials.map(({ field, label }) => (
            <a key={field} href={data.personal[field]} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>{label}<span aria-hidden="true"> ↗</span></a>
          ))}
        </nav>
        <p className={styles['footer-copy']}>© {year}{' ' + data.branding.copyright}</p>
      </div>
    </footer>
  );
}
