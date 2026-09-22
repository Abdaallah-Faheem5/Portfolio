import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { data } from '../../data/index.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Contact.module.css';
import shared from '../../styles/sections.module.css';

function normalizeUrl(url) {
  if (!url || url === '#') return null;
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(url)) return url;
  return `https://${url}`;
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

export default function Contact() {
  const headerRef = useScrollReveal();
  const cardRef = useScrollReveal();

  const contacts = data.contactMethods.map((contact) => {
    const value = data.personal[contact.field];
    const href = contact.field === 'email'
      ? `mailto:${value}`
      : contact.field === 'phone'
        ? `tel:${value.replace(/\s/g, '')}`
        : normalizeUrl(value);
    return href ? { ...contact, value: contact.value || value, href, external: isExternalUrl(href) } : null;
  }).filter(Boolean);

  return (
    <section id="contact" className={`${shared.section} ${styles['contact-section']}`}>
      <div className={shared.container}>
        <div className={styles['contact-wrap']}>
          <div className={`${shared['section-header']} ${shared.reveal}`} ref={headerRef}>
            <p className={shared['section-label']}>{data.sections.contact.label}</p>
            <h2 className={shared['section-title']}>{data.sections.contact.title}</h2>
            <p className={styles['contact-sub']}>{data.contactIntro}</p>
          </div>

          <div className={`${styles['contact-card']} ${shared.reveal}`} ref={cardRef}>
            <div className={styles['contact-orb']} />
            {contacts.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                className={styles['contact-link']}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noreferrer' : undefined}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles['cl-icon']}>
                  <AppIcon name={contact.icon} />
                </span>
                <div className={styles['cl-info']}>
                  <p className={styles['cl-label']}>{contact.label}</p>
                  <p className={styles['cl-value']}>{contact.value}</p>
                </div>
                <span className={styles['cl-arrow']}>-&gt;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
