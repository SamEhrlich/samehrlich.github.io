import React from 'react';
import './resources.css';
import mvpMachineCover from './assets/book_covers/mvp_machine_cover.jpg';
import statisticalRethinkingCover from './assets/book_covers/statistical_rethinking_2_cover.jpg';
import abdwrCover from './assets/book_covers/abdwr_cover.png';
import theBookCover from './assets/book_covers/the_book_cover.jpg';
import futureValueCover from './assets/book_covers/future_value_cover.jpg';
import unhittableCover from './assets/book_covers/unhittable.jpg';
import uramLogo from './assets/job_listings/URAM_logo.avif';
import teamworkOnlineLogo from './assets/job_listings/teamwork_online_logo.png';
import saberpowersLogo from './assets/job_listings/saberpowers_favicon_dark.png';
import fangraphsLogo from './assets/job_listings/fangraphs_logo.jpg';
import nflLogo from './assets/job_listings/nfl_logo.png';
import drivelineLogo from './assets/links/dl_logo.webp';
import savantLogo from './assets/links/savant_logo.png';
import fangraphsLinkLogo from './assets/job_listings/fangraphs_logo.jpg';
import pitcherListLogo from './assets/links/pitcher_list_logo.png';
import bbRefLogo from './assets/links/bb_ref_logo.webp';
import riskOfRuinLogo from './assets/links/risk_of_ruin_logo.jpg';
import athleticLogo from './assets/links/the_athletic_logo.png';
import ratesAndBarrelsLogo from './assets/links/rates_and_barrels.jpg';
import pybaseballLogo from './assets/links/pybaseball_logo.jpg';
import criderLogo from './assets/links/crider_logo.jpg';
import nickWanProfile from './assets/video_profiles/nick_wan.jpg';
import threeBlueOneBrownProfile from './assets/video_profiles/3b1b.jpg';
import roboflowProfile from './assets/video_profiles/roboflow.png';
import andrejProfile from './assets/video_profiles/andrej.jpg';
import tidxProfile from './assets/video_profiles/tidyx.png';
import vivProfile from './assets/twitter_pics/viv.jpg';
import johnEdwardsProfile from './assets/twitter_pics/john_edwards.jpg';
import connerPelletierProfile from './assets/twitter_pics/conner_pelletier.jpg';
import maxBayProfile from './assets/twitter_pics/max_bay.jpg';
import enoSarrisProfile from './assets/twitter_pics/eno_sarris.jpg';
import kyleBoddyProfile from './assets/twitter_pics/kyle_boddy.jpg';
import mikePetrielloProfile from './assets/twitter_pics/mike_petriello.jpg';
import davidAdlerProfile from './assets/twitter_pics/david_adler.jpg';
import tomTangoProfile from './assets/twitter_pics/tom_tango.jpg';
import patrickWardProfile from './assets/twitter_pics/patrick_ward.jpg';
import sethWalderProfile from './assets/twitter_pics/seth_walder.jpg';
import nickWanTwitterProfile from './assets/twitter_pics/nick_wan.jpg';
import robertFreyProfile from './assets/twitter_pics/robert_frey.jpg';
import jasonBernardProfile from './assets/twitter_pics/jason_bernard.jpg';
import joshHejkaProfile from './assets/twitter_pics/josh_hejka.jpg';
import kyleBlandProfile from './assets/twitter_pics/kyle_bland.jpg';
import marekRamiloProfile from './assets/twitter_pics/marek_ramilo.jpg';
import stephenSuttonBrownProfile from './assets/twitter_pics/stephen_sutton_brown.jpg';
import vikProfile from './assets/twitter_pics/vik.jpg';
import claytonThompsonProfile from './assets/twitter_pics/clayton_thompson.jpg';
import briceCriderProfile from './assets/twitter_pics/brice_crider.jpg';
import adamBloebaumProfile from './assets/twitter_pics/adam_bloebaum.jpg';
import alexBrittonProfile from './assets/twitter_pics/alex_britton.jpg';
import jackLambertProfile from './assets/twitter_pics/jack_lambert.jpg';
import neilPierreLouisProfile from './assets/twitter_pics/neil_pierre_louis.jpg';
import remiBunikiewiczProfile from './assets/twitter_pics/remi_bunikiewicz.jpg';
import toddWhiteheadProfile from './assets/twitter_pics/todd_whitehead.jpg';
import piotrSkalskiProfile from './assets/twitter_pics/piotr_salski.jpg';
import travisSawchikProfile from './assets/twitter_pics/travis_sawchik.jpg';
import nineZeroProfile from './assets/twitter_pics/903124.jpg';
import yakyuCosmoProfile from './assets/twitter_pics/yakyu_cosmo.jpg';
import andrejKarpathyProfile from './assets/twitter_pics/andrej_karpathy.jpg';
import andrewLeProfile from './assets/twitter_pics/andrew_le.jpg';

// Must match `scroll-margin-top` on .resources-section in resources.css: an anchor click
// lands the target section's top at exactly this offset, so the active-tab threshold has to
// sit just below it. A threshold above the landing line highlights the previous section.
const SECTION_ANCHOR_OFFSET = 72;

const SECTIONS = [
  { id: 'books', label: 'Books' },
  { id: 'jobs', label: 'Job Listings' },
  { id: 'links', label: 'Links' },
  { id: 'video', label: 'Video' },
  { id: 'people', label: 'People to Follow' },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState(SECTIONS[0].id);

  React.useEffect(() => {
    const syncActiveSection = () => {
      const passed = SECTIONS.filter(
        (section) =>
          document.getElementById(section.id)!.getBoundingClientRect().top <=
          SECTION_ANCHOR_OFFSET + 8
      );
      setActiveSection(passed.length > 0 ? passed[passed.length - 1].id : SECTIONS[0].id);
    };
    syncActiveSection();
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', syncActiveSection);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, self) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, indexInBatch) => {
            // Everything entering together staggers, so a row of cards cascades in
            // rather than popping as one block.
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
      .querySelectorAll('.resources-section-header, .resources-item-card')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="resources-page">
      <header className="resources-hero">
        <h1 className="resources-title">Resources</h1>
      </header>

      <nav className="resources-nav">
        {SECTIONS.map((section) => (
          <a
            className={`resources-nav-button${activeSection === section.id ? ' is-active' : ''}`}
            key={section.id}
            href={`#${section.id}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <section className="resources-section" id="books">
        <div className="resources-section-header">
          <h2>Books</h2>
        </div>
        <div className="resources-items-grid resources-grid--books">
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={mvpMachineCover} alt="The MVP Machine book cover" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.amazon.com/MVP-Machine-Baseballs-Nonconformists-Players/dp/1541698940"
                  target="_blank"
                  rel="noreferrer"
                >
                  The MVP Machine
                </a>
              </h3>
              <p className="resources-item-author">By Ben Lindbergh and Travis Sawchik</p>
              <p className="resources-item-summary">
                A look at how data-driven player development reshaped modern baseball, spotlighting
                teams and innovators who used analytics to build better hitters and pitchers.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img
                src={statisticalRethinkingCover}
                alt="Statistical Rethinking 2 book cover"
                loading="lazy"
              />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://oceanrep.geomar.de/id/eprint/55819/1/Statistical%20Rethinking%202nd%20Edition.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Statistical Rethinking 2
                </a>
              </h3>
              <p className="resources-item-author">By Richard McElreath</p>
              <p className="resources-item-summary">
                A hands-on introduction to Bayesian data analysis and causal modeling, with
                examples in R and Stan.
              </p>
              <a
                className="resources-item-link"
                href="https://github.com/rmcelreath/stat_rethinking_2026"
                target="_blank"
                rel="noreferrer"
              >
                Course materials on GitHub
              </a>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={abdwrCover} alt="Analyzing Baseball Data with R book cover" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://beanumber.github.io/abdwr3e/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Analyzing Baseball Data with R
                </a>
              </h3>
              <p className="resources-item-author">By Jim Albert</p>
              <p className="resources-item-summary">
                A practical guide to exploring baseball data with R, covering core concepts and
                modeling approaches.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={theBookCover} alt="The Book book cover" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.amazon.com/Book-Playing-Percentages-Baseball/dp/1494260174"
                  target="_blank"
                  rel="noreferrer"
                >
                  The Book: Playing the Percentages in Baseball
                </a>
              </h3>
              <p className="resources-item-author">
                By Tom Tango, Mitchel Lichtman, and Andrew Dolphin
              </p>
              <p className="resources-item-summary">
                A modern sabermetrics classic that challenges conventional strategy with evidence,
                covering matchups, platoons, intentional walks, sacrifice plays, clutch hitting, and
                more.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={futureValueCover} alt="Future Value book cover" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.amazon.com/Future-Value-Battle-Baseballs-Superstar/dp/1629377678"
                  target="_blank"
                  rel="noreferrer"
                >
                  Future Value
                </a>
              </h3>
              <p className="resources-item-author">By Eric Longenhagen and Kiley McDaniel</p>
              <p className="resources-item-summary">
                An inside look at how modern teams evaluate and develop prospects, and the pressure
                to find baseball&apos;s next superstar.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={unhittableCover} alt="Unhittable book cover" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.amazon.com/s?k=pitching+ninja+book"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unhittable
                </a>
              </h3>
              <p className="resources-item-author">By Rob Friedman</p>
              <p className="resources-item-summary">
                How technology, mavericks, and innovators engineered baseball's new era of
                pitching dominance, from the creator of PitchingNinja.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-section" id="jobs">
        <div className="resources-section-header">
          <h2>Job Listings</h2>
        </div>
        <div className="resources-items-grid resources-grid--jobs">
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={fangraphsLogo} alt="FanGraphs logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.fangraphs.com/blog-roll?category=Job+Postings"
                  target="_blank"
                  rel="noreferrer"
                >
                  FanGraphs Job Postings
                </a>
              </h3>
              <p className="resources-item-summary">
                FanGraphs blog roll filtered to job postings.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={saberpowersLogo} alt="Scott Powers job board logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://saberpowers.github.io/jobs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Scott Powers Job Board
                </a>
              </h3>
              <p className="resources-item-summary">
                Curated job board with sports analytics and data-related openings.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={teamworkOnlineLogo} alt="TeamWork Online logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.teamworkonline.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  TeamWork Online
                </a>
              </h3>
              <p className="resources-item-summary">
                Job board for sports industry roles across teams, leagues, and partners.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={uramLogo} alt="URAM Sports Data Job Board logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://docs.google.com/spreadsheets/d/15lgluSsk2aBib8Qw35McRjUqUp5f1jRt0T9GVHcAW98/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  URAM Sports Data Job Board
                </a>
              </h3>
              <p className="resources-item-summary">
                Community-maintained job board focused on sports data roles.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={nflLogo} alt="NFL logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://x.com/SethWalder/status/1905648968425414828"
                  target="_blank"
                  rel="noreferrer"
                >
                  Yearly NFL hires list
                </a>
              </h3>
              <p className="resources-item-summary">
                Twitter/X post that aggregates yearly NFL hiring updates.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-section" id="links">
        <div className="resources-section-header">
          <h2>Links</h2>
        </div>
        <div className="resources-items-grid resources-grid--links">
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={savantLogo} alt="Baseball Savant logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://baseballsavant.mlb.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Baseball Savant
                </a>
              </h3>
              <p className="resources-item-summary">
                Statcast data, leaderboards, and player tools from MLB.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={pybaseballLogo} alt="pybaseball logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://github.com/jldbc/pybaseball"
                  target="_blank"
                  rel="noreferrer"
                >
                  pybaseball
                </a>
              </h3>
              <p className="resources-item-summary">
                Python library for accessing baseball data from popular sources.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={ratesAndBarrelsLogo} alt="Rates & Barrels logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/c/RatesBarrels"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rates & Barrels
                </a>
              </h3>
              <p className="resources-item-summary">
                Baseball analysis and fantasy-focused podcast content.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={athleticLogo} alt="The Athletic logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.nytimes.com/athletic/mlb/"
                  target="_blank"
                  rel="noreferrer"
                >
                  The Athletic MLB
                </a>
              </h3>
              <p className="resources-item-summary">
                MLB coverage, reporting, and analysis from The Athletic.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={riskOfRuinLogo} alt="Risk of Ruin podcast logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/channel/UCHlTta3BXCoPbMvHHwslirg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Risk of Ruin Podcast
                </a>
              </h3>
              <p className="resources-item-summary">
                Baseball analytics conversations covering research, strategy, and modeling.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={bbRefLogo} alt="Baseball-Reference logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.baseball-reference.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Baseball Reference
                </a>
              </h3>
              <p className="resources-item-summary">
                Historical stats, player pages, and research tools for baseball.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={pitcherListLogo} alt="Pitcher List logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://pitcherlist.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pitcher List
                </a>
              </h3>
              <p className="resources-item-summary">
                Analysis, leaderboards, and player tools with a focus on pitchers.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={fangraphsLinkLogo} alt="FanGraphs logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.fangraphs.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  FanGraphs
                </a>
              </h3>
              <p className="resources-item-summary">
                Analytics-driven baseball coverage, leaderboards, and research.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={drivelineLogo} alt="Driveline Baseball logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.drivelinebaseball.com/blog/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Driveline Baseball Blog
                </a>
              </h3>
              <p className="resources-item-summary">
                Training, performance, and analytics insights from Driveline Baseball.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={drivelineLogo} alt="Driveline Baseball logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>Driveline R&amp;D Podcast</h3>
              <p className="resources-item-summary">
                Old episodes are hosted on YouTube; new episodes are in the current playlist.
              </p>
              <a
                className="resources-item-link"
                href="https://www.youtube.com/watch?v=2fjpL_BraVU&list=PLGSlrSk6rBqJH8h8_Im9AaUbkweRMRXc9"
                target="_blank"
                rel="noreferrer"
              >
                New episodes (playlist)
              </a>
              <a
                className="resources-item-link"
                href="https://www.youtube.com/@DrivelineRDPodcast/videos"
                target="_blank"
                rel="noreferrer"
              >
                Old episodes (YouTube)
              </a>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={criderLogo} alt="Crider Performance logo" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.criderperformance.com/blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  Crider Performance Blog
                </a>
              </h3>
              <p className="resources-item-summary">
                Training, performance, and coaching insights from Crider Performance.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-section" id="video">
        <div className="resources-section-header">
          <h2>Video</h2>
        </div>
        <div className="resources-items-grid resources-grid--video">
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={tidxProfile} alt="TidyX screencast profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/@TidyX_screencast"
                  target="_blank"
                  rel="noreferrer"
                >
                  TidyX screencast
                </a>
              </h3>
              <p className="resources-item-summary">
                Tidyverse-focused screencasts and data visualization workflows.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={roboflowProfile} alt="Roboflow profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/@Roboflow"
                  target="_blank"
                  rel="noreferrer"
                >
                  Roboflow
                </a>
              </h3>
              <p className="resources-item-summary">
                Computer vision tutorials, demos, and applied ML workflows.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={andrejProfile} alt="Andrej Karpathy profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/andrejkarpathy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Andrej Karpathy
                </a>
              </h3>
              <p className="resources-item-summary">
                Deep learning lectures, coding sessions, and AI research insights.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={threeBlueOneBrownProfile} alt="3Blue1Brown profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/@3blue1brown"
                  target="_blank"
                  rel="noreferrer"
                >
                  3Blue1Brown
                </a>
              </h3>
              <p className="resources-item-summary">
                Visual explanations of math and intuition-heavy concepts.
              </p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={nickWanProfile} alt="Nick Wan profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a
                  className="resources-item-title-link"
                  href="https://www.youtube.com/c/NickWan"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nick Wan
                </a>
              </h3>
              <p className="resources-item-summary">
                Baseball analysis and player development breakdowns.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-section" id="people">
        <div className="resources-section-header">
          <h2>People to Follow</h2>
        </div>
        <div className="resources-items-grid resources-grid--people">
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={nineZeroProfile} alt="903124 profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/903124S" target="_blank" rel="noreferrer">
                  903124
                </a>
              </h3>
              <p className="resources-item-author">@903124S</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={adamBloebaumProfile} alt="Adam Bloebaum profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/bl0ebaum" target="_blank" rel="noreferrer">
                  Adam Bloebaum
                </a>
              </h3>
              <p className="resources-item-author">@bl0ebaum</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={alexBrittonProfile} alt="Alex Britton profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/alexbbritton22" target="_blank" rel="noreferrer">
                  Alex Britton
                </a>
              </h3>
              <p className="resources-item-author">@alexbbritton22</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={andrejKarpathyProfile} alt="Andrej Karpathy profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/karpathy" target="_blank" rel="noreferrer">
                  Andrej Karpathy
                </a>
              </h3>
              <p className="resources-item-author">@karpathy</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={andrewLeProfile} alt="Andrew Le profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/andrewletics" target="_blank" rel="noreferrer">
                  Andrew Le
                </a>
              </h3>
              <p className="resources-item-author">@andrewletics</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={briceCriderProfile} alt="Brice Crider profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/Crider_HP" target="_blank" rel="noreferrer">
                  Brice Crider
                </a>
              </h3>
              <p className="resources-item-author">@Crider_HP</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={claytonThompsonProfile} alt="Clayton Thompson profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/clayton_t22" target="_blank" rel="noreferrer">
                  Clayton Thompson
                </a>
              </h3>
              <p className="resources-item-author">@clayton_t22</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={connerPelletierProfile} alt="Conner Pelletier profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/connerpelletier" target="_blank" rel="noreferrer">
                  Conner Pelletier
                </a>
              </h3>
              <p className="resources-item-author">@connerpelletier</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={davidAdlerProfile} alt="David Adler profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/_dadler" target="_blank" rel="noreferrer">
                  David Adler
                </a>
              </h3>
              <p className="resources-item-author">@_dadler</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={enoSarrisProfile} alt="Eno Sarris profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/enosarris" target="_blank" rel="noreferrer">
                  Eno Sarris
                </a>
              </h3>
              <p className="resources-item-author">@enosarris</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={jackLambertProfile} alt="Jack Lambert profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/jacklambert__" target="_blank" rel="noreferrer">
                  Jack Lambert
                </a>
              </h3>
              <p className="resources-item-author">@jacklambert__</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={jasonBernardProfile} alt="Jason Bernard profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/JasonBernard_" target="_blank" rel="noreferrer">
                  Jason Bernard
                </a>
              </h3>
              <p className="resources-item-author">@JasonBernard_</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={johnEdwardsProfile} alt="John Edwards profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/John_B_Edwards" target="_blank" rel="noreferrer">
                  John Edwards
                </a>
              </h3>
              <p className="resources-item-author">@John_B_Edwards</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={joshHejkaProfile} alt="Josh Hejka profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/hedgertronic" target="_blank" rel="noreferrer">
                  Josh Hejka
                </a>
              </h3>
              <p className="resources-item-author">@hedgertronic</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={kyleBlandProfile} alt="Kyle Bland profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/blandalytics" target="_blank" rel="noreferrer">
                  Kyle Bland
                </a>
              </h3>
              <p className="resources-item-author">@blandalytics</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={kyleBoddyProfile} alt="Kyle Boddy profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/drivelinekyle" target="_blank" rel="noreferrer">
                  Kyle Boddy
                </a>
              </h3>
              <p className="resources-item-author">@drivelinekyle</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={marekRamiloProfile} alt="Marek Ramilo profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/marekramilo" target="_blank" rel="noreferrer">
                  Marek Ramilo
                </a>
              </h3>
              <p className="resources-item-author">@marekramilo</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={maxBayProfile} alt="Max Bay profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/choice_fielder" target="_blank" rel="noreferrer">
                  Max Bay
                </a>
              </h3>
              <p className="resources-item-author">@choice_fielder</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={mikePetrielloProfile} alt="Mike Petriello profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/mike_petriello" target="_blank" rel="noreferrer">
                  Mike Petriello
                </a>
              </h3>
              <p className="resources-item-author">@mike_petriello</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={neilPierreLouisProfile} alt="Neil Pierre-Louis profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/pierreanalytics" target="_blank" rel="noreferrer">
                  Neil Pierre-Louis
                </a>
              </h3>
              <p className="resources-item-author">@pierreanalytics</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={nickWanTwitterProfile} alt="Nick Wan profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/nickwan" target="_blank" rel="noreferrer">
                  Nick Wan
                </a>
              </h3>
              <p className="resources-item-author">@nickwan</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={patrickWardProfile} alt="Patrick Ward profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/OSPpatrick" target="_blank" rel="noreferrer">
                  Patrick Ward
                </a>
              </h3>
              <p className="resources-item-author">@OSPpatrick</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={piotrSkalskiProfile} alt="Piotr Skalski profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/skalskip92" target="_blank" rel="noreferrer">
                  Piotr Skalski
                </a>
              </h3>
              <p className="resources-item-author">@skalskip92</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={remiBunikiewiczProfile} alt="Remi Bunikiewicz profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/RBunikiewicz" target="_blank" rel="noreferrer">
                  Remi Bunikiewicz
                </a>
              </h3>
              <p className="resources-item-author">@RBunikiewicz</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={robertFreyProfile} alt="Robert Frey profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/RobertFrey40" target="_blank" rel="noreferrer">
                  Robert Frey
                </a>
              </h3>
              <p className="resources-item-author">@RobertFrey40</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={sethWalderProfile} alt="Seth Walder profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/SethWalder" target="_blank" rel="noreferrer">
                  Seth Walder
                </a>
              </h3>
              <p className="resources-item-author">@SethWalder</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={stephenSuttonBrownProfile} alt="Stephen Sutton-Brown profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/srbrown70" target="_blank" rel="noreferrer">
                  Stephen Sutton-Brown
                </a>
              </h3>
              <p className="resources-item-author">@srbrown70</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={toddWhiteheadProfile} alt="Todd Whitehead profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/CrumpledJumper" target="_blank" rel="noreferrer">
                  Todd Whitehead
                </a>
              </h3>
              <p className="resources-item-author">@CrumpledJumper</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={tomTangoProfile} alt="Tom Tango profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/tangotiger" target="_blank" rel="noreferrer">
                  Tom Tango
                </a>
              </h3>
              <p className="resources-item-author">@tangotiger</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={travisSawchikProfile} alt="Travis Sawchik profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/Travis_Sawchik" target="_blank" rel="noreferrer">
                  Travis Sawchik
                </a>
              </h3>
              <p className="resources-item-author">@Travis_Sawchik</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={vikProfile} alt="Vik profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/vikhyatk" target="_blank" rel="noreferrer">
                  Vik
                </a>
              </h3>
              <p className="resources-item-author">@vikhyatk</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={vivProfile} alt="Vivienne profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/sunshinevvn" target="_blank" rel="noreferrer">
                  Vivienne
                </a>
              </h3>
              <p className="resources-item-author">@sunshinevvn</p>
            </div>
          </article>
          <article className="resources-item-card">
            <div className="resources-item-media">
              <img src={yakyuCosmoProfile} alt="Yakyu Cosmopolitan profile" loading="lazy" />
            </div>
            <div className="resources-item-content">
              <h3>
                <a className="resources-item-title-link" href="https://x.com/yakyucosmo" target="_blank" rel="noreferrer">
                  Yakyu Cosmopolitan
                </a>
              </h3>
              <p className="resources-item-author">@yakyucosmo</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default App;
