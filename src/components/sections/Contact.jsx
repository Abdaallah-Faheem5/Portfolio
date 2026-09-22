import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { data } from '../../data/index.js';
import { AppIcon } from '../AppIcon.jsx';
import styles from './Contact.module.css';
import shared from '../../styles/sections.module.css';

export default function Contact() {
  const headerRef = useScrollReveal();
  const contacts = data.contactMethods.flatMap((contact) => {
    const value = data.personal[contact.field];
    if (!value || value === '#') return [];
    const href = contact.field === 'email' ? `mailto:${value}`
      : contact.field === 'phone' ? `tel:${value.replace(/\s/g, '')}`
      : /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return [{ ...contact, value: contact.value || value, href, external: /^https?:\/\//i.test(href) }];
  });

  return (
    <section id="contact" className={`${shared.section} ${styles['contact-section']}`} aria-labelledby="contact-heading">
      <div className={shared.container}>
        <div className={styles['contact-wrap']}>
          <header className={`${styles.header} ${shared.reveal}`} ref={headerRef}>
            <p className={styles.label}>{data.sections.contact.label}</p>
            <h2 id="contact-heading" className={styles.heading}>{data.sections.contact.title}</h2>
            <p className={styles['contact-sub']}>{data.contactIntro}</p>
          </header>
          <div className={styles.actions}>
            {contacts.map((contact) => (
              <a key={contact.field} href={contact.href}
                className={`${styles['contact-link']} ${contact.field === 'email' ? styles.primary : ''}`}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                aria-label={`${contact.label}: ${contact.value}${contact.external ? ' (opens in a new tab)' : ''}`}>
                <span className={styles.icon}><AppIcon name={contact.icon} /></span>
                <span className={styles.info}>
                  <span className={styles['contact-label']}>{contact.label}</span>
                  <span className={styles.value}>{contact.value}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
