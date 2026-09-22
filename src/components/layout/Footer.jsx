import { data } from '../../data/index.js';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-line']} />
      <div className={styles['footer-inner']}>
        <span className={styles['footer-logo']}>{data.branding.footer}</span>
        <p className={styles['footer-copy']}>
          © {year}{' ' + data.branding.copyright}
        </p>
      </div>
    </footer>
  );
}
