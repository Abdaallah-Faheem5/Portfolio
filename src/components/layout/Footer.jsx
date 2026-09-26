import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const { data, t, language } = usePortfolio();
  const year = new Date().getFullYear();
  const socials = data.contactMethods.filter(({ field }) =>
    ['linkedin', 'github'].includes(field) && data.personal[field] && data.personal[field] !== '#');
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-inner']}>
        <div className={styles.identity}>
          <a dir="ltr" className={styles['footer-logo']} href="#hero" aria-label={t('Back to introduction')}>{data.branding.footer}</a>
          <p className={styles.role}>{data.personal.title}</p>
        </div>
        <nav className={styles.socials} aria-label={t('Footer social links')}>
          {socials.map(({ field, label }) => (
            <a key={field} href={data.personal[field]} target="_blank" rel="noopener noreferrer" aria-label={`${label} (${t('opens in a new tab')})`}>{label}<span aria-hidden="true"> {language === 'ar' ? '\u2196' : '\u2197'}</span></a>
          ))}
        </nav>
        <p className={styles['footer-copy']}>© {year}{' ' + data.branding.copyright}</p>
      </div>
    </footer>
  );
}
