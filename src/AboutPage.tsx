import React from 'react';
import './resources.css';
import './about.css';
import { PROFILE, SOCIALS, JOURNEY, MEDIA, LAB, type Entry } from './aboutContent';

const initials = PROFILE.name
  .split(' ')
  .map((part) => part[0])
  .join('');

const EntryList: React.FC<{ id: string; title: string; entries: Entry[] }> = ({
  id,
  title,
  entries,
}) => (
  <section className="resources-section" id={id}>
    <div className="resources-section-header">
      <h2>{title}</h2>
    </div>
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
  </section>
);

const AboutPage: React.FC = () => {
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
      .querySelectorAll('.resources-section-header, .resources-item-card, .about-prose p')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

      <header className="about-hero">
        <div className="about-hero-media">
          {PROFILE.headshot ? (
            <img src={PROFILE.headshot} alt={PROFILE.name} />
          ) : (
            <span className="about-hero-initials">{initials}</span>
          )}
        </div>
        <div className="about-hero-body">
          <h1 className="resources-title">{PROFILE.name}</h1>
          {PROFILE.tagline && <p className="about-tagline">{PROFILE.tagline}</p>}
          {PROFILE.overview.length > 0 && (
            <div className="about-prose about-overview">
              {PROFILE.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          <div className="about-links">
            {SOCIALS.map((social) => (
              <a
                className="about-link"
                key={social.url}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
              >
                {social.label}
              </a>
            ))}
            <a className="about-link is-primary" href="/">
              Resources
            </a>
          </div>
        </div>
      </header>

      {JOURNEY.length > 0 && (
        <section className="resources-section" id="journey">
          <div className="resources-section-header">
            <h2>My Journey</h2>
          </div>
          <div className="about-prose about-journey">
            {JOURNEY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {MEDIA.length > 0 && <EntryList id="media" title="In the Media" entries={MEDIA} />}
      {LAB.length > 0 && <EntryList id="lab" title="In the Lab" entries={LAB} />}
    </div>
  );
};

export default AboutPage;
