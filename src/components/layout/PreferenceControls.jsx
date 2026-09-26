import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './PreferenceControls.module.css';

export default function PreferenceControls() {
  const { theme, setTheme, language, setLanguage, t } = usePortfolio();
  const themeLabel = t(theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  return (
    <div className={styles.controls} role="group" aria-label={t('Appearance and language')}>
      <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={themeLabel} title={themeLabel}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />}
        </svg>
      </button>
      <button type="button" dir="ltr" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        aria-label={language === 'en' ? 'Switch to Arabic / التبديل إلى العربية' : 'التبديل إلى الإنجليزية / Switch to English'}>
        <span aria-hidden="true" className={language === 'en' ? styles.active : ''}>EN</span><span aria-hidden="true">/</span><span aria-hidden="true" className={language === 'ar' ? styles.active : ''}>AR</span>
      </button>
    </div>
  );
}
