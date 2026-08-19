import React from 'react';
import './resources.css';
import './about.css';
import {
  DRAFT,
  PROFILE,
  SOCIALS,
  RESUME_URL,
  JOURNEY,
  MEDIA,
  LAB,
  type Entry,
} from './aboutContent';
import { Icon, type IconName } from './icons';

const initials = PROFILE.name
  .split(' ')
  .map((part) => part[0])
  .join('');

/** Draft-only marker naming the export to fill in. Renders nothing once DRAFT is false. */
const Slot: React.FC<{ label: string; source: string; hint?: string }> = ({
  label,
  source,
  hint,
}) => (
  <div className="about-slot">
    <span className="about-slot-label">{label}</span>
    <code className="about-slot-source">{source}</code>
    {hint && <span className="about-slot-hint">{hint}</span>}
  </div>
);

/** Socials worth prompting for; ghosted in the link row until they are added. */
const SUGGESTED_SOCIALS: { label: string; icon: IconName }[] = [
  { label: 'X', icon: 'x' },
  { label: 'LinkedIn', icon: 'linkedin' },
  { label: 'Email', icon: 'email' },
];

/** Resume preview. Kept in-page so the CTA does not navigate away from the site. */
const ResumeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    // Lock the page behind the overlay so a scroll gesture does not move both layers.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="about-modal-backdrop" onClick={onClose}>
      <div
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="about-modal-bar">
          <span className="about-modal-title">Resume</span>
          <a className="about-modal-action" href={RESUME_URL} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
          <a className="about-modal-action" href={RESUME_URL} download="SamEhrlichResume.pdf">
            Download
          </a>
          <button className="about-modal-close" onClick={onClose} ref={closeRef} aria-label="Close">
            &times;
          </button>
        </div>
        <iframe className="about-modal-frame" src={RESUME_URL} title="Resume" />
      </div>
    </div>
  );
};

const EntrySection: React.FC<{
  id: string;
  title: string;
  entries: Entry[];
  source: string;
  hint: string;
}> = ({ id, title, entries, source, hint }) => {
  if (entries.length === 0 && !DRAFT) return null;
  return (
    <section className="resources-section" id={id}>
      <div className="resources-section-header">
        <h2>{title}</h2>
      </div>
      {entries.length > 0 ? (
        <div className="resources-items-grid about-entry-grid">
          {entries.map((entry) => (
            <article className="resources-item-card about-entry-card" key={entry.url}>
              <div className="resources-item-content">
                <h3>
                  <a
                    className="resources-item-title-link"
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {entry.title}
                  </a>
                </h3>
                {(entry.source || entry.date) && (
                  <p className="resources-item-author">
                    {[entry.source, entry.date].filter(Boolean).join(' · ')}
                  </p>
                )}
                {entry.summary && <p className="resources-item-summary">{entry.summary}</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <Slot label={`${title} entries`} source={source} hint={hint} />
      )}
    </section>
  );
};

const AboutPage: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, self) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, indexInBatch) => {
            window.setTimeout(
              () => entry.target.classList.add('is-revealed'),
              Math.min(indexInBatch, 10) * 45
            );
            self.unobserve(entry.target);
          });
      },
      { rootMargin: '0px 0px -6% 0px' }
    );
    document
      .querySelectorAll(
        '.resources-section-header, .resources-item-card, .about-prose p, .about-slot'
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const missingSocials = SUGGESTED_SOCIALS.filter(
    (suggestion) => !SOCIALS.some((social) => social.icon === suggestion.icon)
  );

  return (
    <div className="resources-page about-page">
      <nav className="about-viewswitch">
        <a className="about-viewswitch-link" href="/">
          Resources
        </a>
        <span className="about-viewswitch-link is-current" aria-current="page">
          About
        </span>
      </nav>

      {DRAFT && (
        <p className="about-draft-banner">
          Draft mode — labelled slots below show what to fill in. Set{' '}
          <code>DRAFT = false</code> in <code>src/aboutContent.ts</code> to hide them before
          publishing.
        </p>
      )}

      <header className="about-hero">
        <div className={`about-hero-media${PROFILE.headshot ? '' : ' is-empty'}`}>
          {PROFILE.headshot ? (
            <img src={PROFILE.headshot} alt={PROFILE.name} />
          ) : (
            <span className="about-hero-initials">{initials}</span>
          )}
        </div>
        {DRAFT && !PROFILE.headshot && (
          <Slot
            label="Headshot"
            source="PROFILE.headshot"
            hint="Drop the image in src/assets/ and import it"
          />
        )}

        <h1 className="about-name">{PROFILE.name}</h1>

        {PROFILE.tagline ? (
          <p className="about-tagline">{PROFILE.tagline}</p>
        ) : (
          DRAFT && (
            <Slot
              label="Tagline"
              source="PROFILE.tagline"
              hint="One line under your name — role and where"
            />
          )
        )}

        <div className="about-links">
          {SOCIALS.map((social) => (
            <a
              className="about-icon-link"
              key={social.url}
              href={social.url}
              title={social.label}
              aria-label={social.label}
              target={social.url.startsWith('http') ? '_blank' : undefined}
              rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
            >
              <Icon name={social.icon} />
            </a>
          ))}
          {DRAFT &&
            missingSocials.map((suggestion) => (
              <span
                className="about-icon-link is-ghost"
                key={suggestion.icon}
                title={`Add ${suggestion.label} to SOCIALS`}
                aria-hidden="true"
              >
                <Icon name={suggestion.icon} />
              </span>
            ))}
          <a className="about-cta" href="/">
            <Icon name="book" />
            Resources
          </a>
          {RESUME_URL ? (
            <button className="about-cta is-secondary" onClick={() => setIsResumeOpen(true)}>
              <Icon name="resume" />
              Resume
            </button>
          ) : (
            DRAFT && (
              <span className="about-cta is-secondary is-ghost" aria-hidden="true">
                <Icon name="resume" />
                Resume
              </span>
            )
          )}
        </div>
        {DRAFT && missingSocials.length > 0 && (
          <Slot
            label="Social links"
            source="SOCIALS"
            hint={`Ghosted above: ${missingSocials.map((s) => s.label).join(', ')}`}
          />
        )}
        {DRAFT && !RESUME_URL && (
          <Slot
            label="Resume"
            source="RESUME_URL"
            hint="Put the PDF in public/ and point here, e.g. '/resume.pdf'"
          />
        )}
      </header>

      {(JOURNEY.length > 0 || DRAFT) && (
        <section className="resources-section" id="journey">
          <div className="resources-section-header">
            <h2>My Journey</h2>
          </div>
          {JOURNEY.length > 0 ? (
            <div className="about-prose about-journey">
              {JOURNEY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            DRAFT && (
              <Slot
                label="Journey story"
                source="JOURNEY"
                hint="The longer story of how you got into the field — one string per paragraph"
              />
            )
          )}
        </section>
      )}

      <EntrySection
        id="media"
        title="In the Media"
        entries={MEDIA}
        source="MEDIA"
        hint="{ title, url, source?, date?, summary? } — podcasts, interviews, articles"
      />
      {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}

      <EntrySection
        id="lab"
        title="In the Lab"
        entries={LAB}
        source="LAB"
        hint="{ title, url, source?, date?, summary? } — research, repos, projects"
      />
    </div>
  );
};

export default AboutPage;
