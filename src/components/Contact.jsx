import { useScrollReveal } from '../hooks/useScrollReveal.js';
import { data } from '../data/index.js';
import { AppIcon } from './AppIcon.jsx';
import './Contact.css';

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

  const linkedinUrl = normalizeUrl(data.personal.linkedin);
  const githubUrl = normalizeUrl(data.personal.github);
  const cvUrl = normalizeUrl(data.personal.cv);

  const contacts = [
    {
      icon: 'EMAIL',
      label: 'Email',
      value: data.personal.email,
      href: `mailto:${data.personal.email}`,
      external: false,
    },
    {
      icon: 'PHONE',
      label: 'Phone',
      value: data.personal.phone,
      href: `tel:${data.personal.phone.replace(/\s/g, '')}`,
      external: false,
    },
    linkedinUrl
      ? {
          icon: 'LINKEDIN',
          label: 'LinkedIn',
          value: 'LinkedIn Profile',
          href: linkedinUrl,
          external: isExternalUrl(linkedinUrl),
        }
      : null,
    githubUrl
      ? {
          icon: 'GITHUB',
          label: 'GitHub',
          value: 'GitHub Portfolio',
          href: githubUrl,
          external: isExternalUrl(githubUrl),
        }
      : null,
    cvUrl
      ? {
          icon: 'CV',
          label: 'Resume',
          value: 'Download CV',
          href: cvUrl,
          external: isExternalUrl(cvUrl),
        }
      : null,
  ].filter(Boolean);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-wrap">
          <div className="section-header reveal" ref={headerRef}>
            <p className="section-label">// 05. contact</p>
            <h2 className="section-title">Let&apos;s Build Something</h2>
            <p className="contact-sub">Got a project? Looking for a developer? I&apos;m open.</p>
          </div>

          <div className="contact-card reveal" ref={cardRef}>
            <div className="contact-orb" />
            {contacts.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                className="contact-link"
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noreferrer' : undefined}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="cl-icon">
                  <AppIcon name={contact.icon} />
                </span>
                <div className="cl-info">
                  <p className="cl-label">{contact.label}</p>
                  <p className="cl-value">{contact.value}</p>
                </div>
                <span className="cl-arrow">-&gt;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
