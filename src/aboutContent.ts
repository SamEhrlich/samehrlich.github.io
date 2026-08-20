// All About-page copy lives here so the layout never has to be edited to change content.
//
// DRAFT mode shows a labelled placeholder for every empty slot, naming the export to fill
// in. Set DRAFT to false before publishing and empty slots disappear entirely, so a
// partially-filled page still looks finished.

import type { IconName } from './icons';
import headshot from './assets/about/headshot.jpg';
import resume from './assets/about/resume.pdf';
import mlbLogo from './assets/about/sources/mlb.png';
import drivelineLogo from './assets/about/sources/driveline.webp';
import sabrLogo from './assets/about/sources/sabr.png';
import ratesAndBarrelsLogo from './assets/about/sources/rates_and_barrels.jpg';

/** Set to false before publishing. */
export const DRAFT = true;

export type Social = {
  /** Accessible name for the icon-only button, e.g. "GitHub". */
  label: string;
  url: string;
  icon: IconName;
};

export type Entry = {
  title: string;
  url: string;
  /** Publication, podcast, journal, or repo the entry lives on. */
  source?: string;
  /** Free-form, e.g. "2026" or "March 2026". Shown next to the source. */
  date?: string;
  summary?: string;
  /** Source logo. Falls back to `icon` when the outlet has no mark on hand. */
  logo?: string;
  icon?: IconName;
};

export const PROFILE = {
  name: 'Sam Ehrlich',
  /** One line under the name. */
  tagline: 'Baseball Operations Analyst — Driveline Baseball' as string,
  /** What you work on. Rendered as one line, middot-separated. */
  focus: ['MLB Analysis', 'Computer Vision', 'In-Gym Support'] as string[],
  /** Import an image into src/assets/ and assign it here; falls back to initials when empty. */
  headshot: headshot,
};

export const SOCIALS: Social[] = [
  { label: 'X', url: 'https://x.com/SamEhrlich', icon: 'x' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/samuel-ehrlich-5a24351a3/', icon: 'linkedin' },
  { label: 'GitHub', url: 'https://github.com/SamEhrlich', icon: 'github' },
  { label: 'Email', url: 'mailto:sehrlich98@gmail.com', icon: 'email' },
];

/** Path or URL to the resume. Empty renders a draft placeholder. */
export const RESUME_URL: string = resume;

export type Role = {
  role: string;
  org: string;
  dates: string;
  detail?: string;
};

export const EXPERIENCE: Role[] = [
  {
    role: 'Baseball Operations Analyst, Data Science',
    org: 'Driveline Baseball',
    dates: 'Jan 2025 — Present',
    detail: 'Kent, WA',
  },
  {
    role: 'Data Analyst',
    org: 'University of Missouri Baseball',
    dates: 'Aug 2022 — May 2023',
    detail: 'Columbia, MO',
  },
  {
    role: 'MS, Data Science and Analytics',
    org: 'University of Missouri',
    dates: '2021 — 2023',
    detail: 'High Performance Computing',
  },
  {
    role: 'BS, Parks, Recreation and Sport',
    org: 'University of Missouri',
    dates: '2017 — 2020',
    detail: 'Sport Management, cum laude',
  },
];

export const MEDIA: Entry[] = [
  {
    title: "What's 'wrong' with Skenes? Let's dissect his recent slump",
    url: 'https://www.mlb.com/news/paul-skenes-2026-metrics-comparison-deep-dive',
    source: 'MLB.com',
    date: 'August 2026',
    summary: 'Analysis contributed.',
    logo: mlbLogo,
  },
  {
    title: 'Searching for answers to Raleigh\u2019s mysterious struggles',
    url: 'https://www.mlb.com/news/cal-raleigh-offensive-slump-discussion-2026',
    source: 'MLB.com',
    date: 'July 2026',
    summary: 'Analysis contributed.',
    logo: mlbLogo,
  },
  {
    title: 'How in the heck has Fernando Tatis Jr. not homered yet? A forensic swing investigation',
    url: 'https://drivelinebaseball.com/blogs/blog/fernando-tatis-jr-no-home-runs-swing-investigation',
    source: 'Driveline Baseball',
    date: 'May 2026',
    logo: drivelineLogo,
  },
  {
    title: 'Forcing Rotation: Exploring Lead-Leg Force Curves and Rotation in Hitters',
    url: 'https://drivelinebaseball.com/blogs/blog/forcing-rotation-exploring-lead-leg-force-curves-and-rotation-in-hitters',
    source: 'Driveline Baseball',
    date: 'April 2026',
    logo: drivelineLogo,
  },
  {
    title: 'Two stats to believe in this early on -- and one to forget',
    url: 'https://www.mlb.com/news/mlb-stats-to-trust-in-early-april',
    source: 'MLB.com',
    date: 'April 2026',
    logo: mlbLogo,
  },
  {
    title: 'The Interaction of Biomechanics and Command',
    url: 'https://drivelinebaseball.com/blogs/blog/the-interaction-of-biomechanics-and-command',
    source: 'Driveline Baseball',
    date: 'February 2026',
    logo: drivelineLogo,
  },
  {
    title: 'Optimizing Bat Paths',
    url: 'https://drivelinebaseball.com/blogs/blog/optimizing-bat-paths',
    source: 'Driveline Baseball',
    date: 'January 2026',
    logo: drivelineLogo,
  },
  {
    title: 'Solving Ball Flight Physics',
    url: 'https://www.youtube.com/watch?v=ZRKJbYRHmXw',
    source: 'SABR Analytics Conference',
    date: '2026',
    summary: 'Presented with Conner Pelletier and Josh Hejka.',
    logo: sabrLogo,
  },
  {
    title: 'The next big thing? This strange pitch is being reverse engineered',
    url: 'https://www.tiktok.com/@pitchingninja/video/7625681062009605389',
    source: 'Pitching Ninja',
    icon: 'tiktok',
  },
  {
    title: 'Takeaways From Saberseminar & A Packed Weekend of Baseball News',
    url: 'https://podcasts.apple.com/us/podcast/rates-barrels-a-show-about-baseball/id1486883874?i=1000723499511',
    source: 'Rates & Barrels',
    date: 'August 2025',
    logo: ratesAndBarrelsLogo,
  },
  {
    title:
      'Pelletier, Lambert, Becerra, Ehrlich win inaugural Dr. Mike Marshall Baseball Biomechanics Research Award',
    url: 'https://sabr.org/latest/pelletier-lambert-becerra-ehrlich-win-inaugural-dr-mike-marshall-baseball-biomechanics-research-award/',
    source: 'SABR',
    date: 'March 2025',
    logo: sabrLogo,
  },
];

/** Work samples: research, repos, projects. */
export const PORTFOLIO: Entry[] = [];
