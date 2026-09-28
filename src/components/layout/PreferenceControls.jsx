import { usePortfolio } from '../../context/Preferences.jsx';
import styles from './PreferenceControls.module.css';

export default function PreferenceControls() {
  const { language, setLanguage } = usePortfolio();
  return (
    <div className={styles.controls} role="group" aria-label={language === 'ar' ? 'اللغة' : 'Language'}>
      <button type="button" dir="ltr" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        aria-label={language === 'en' ? 'Switch to Arabic / التبديل إلى العربية' : 'التبديل إلى الإنجليزية / Switch to English'}>
        <span aria-hidden="true" className={language === 'en' ? styles.active : ''}>EN</span><span aria-hidden="true">/</span><span aria-hidden="true" className={language === 'ar' ? styles.active : ''}>AR</span>
      </button>
    </div>
  );
}
