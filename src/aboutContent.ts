// All About-page copy lives here so the layout never has to be edited to change content.
//
// DRAFT mode shows a labelled placeholder for every empty slot, naming the export to fill
// in. Set DRAFT to false before publishing and empty slots disappear entirely, so a
// partially-filled page still looks finished.

import type { IconName } from './icons';
import headshot from './assets/about/headshot.jpg';
// The published copy with the home address and phone number redacted out of the
// content stream. resume.pdf is the full original and is never shipped.
import resume from './assets/about/resume_public.pdf';
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
  focus: ['MLB Analysis', 'Computer Vision'] as string[],
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
    title: 'Inside Baseball\u2019s Next Analytics Revolution',
    url: 'https://podcasts.apple.com/us/podcast/inside-baseballs-next-analytics-revolution/id1486883874?i=1000787044400',
    source: 'Rates & Barrels',
    date: 'August 2026',
    summary: 'Recorded on site at Saberseminar.',
    logo: ratesAndBarrelsLogo,
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

/** Work samples: research, repos, projects. Hidden until there is something to show;
    flip to true and fill PORTFOLIO to bring the section and its nav tab back. */
export const SHOW_PORTFOLIO = false;

export const PORTFOLIO: Entry[] = [];

/** A run of text with optional inline links, so a bullet can link a phrase mid-sentence. */
export type RichText = (string | { text: string; url: string })[];

export type Bullet = { text: RichText; sub?: RichText[] };

export type ResumeRole = {
  org: string;
  title: string;
  dates: string;
  bullets: Bullet[];
};

export type Degree = { degree: string; detail?: string; dates: string };

// The resume rendered on the page. Deliberately not generated from the PDF: this version
// carries no home address or phone, and the PDF download is the redacted resume_public.pdf.
export const RESUME_EXPERIENCE: ResumeRole[] = [
  {
    org: 'Driveline Baseball, Kent, WA',
    title: 'Baseball Operations Analyst - Data Science',
    dates: 'Jan 2025 - Present',
    bullets: [
      {
        text: [
          'Repeat researcher and presenter at 2x SABR and 1x Saberseminar conference on novel batting and pitching studies',
        ],
        sub: [
          [
            'Biomechanics and Command Interaction study awarded the ',
            {
              text: 'SABR Mike Marshall Biomechanics Research Award',
              url: 'https://sabr.org/latest/pelletier-lambert-becerra-ehrlich-win-inaugural-dr-mike-marshall-baseball-biomechanics-research-award/',
            },
          ],
          [
            'Swing Path Optimization identifying the optimal Power vs Contact tradeoff of a batter’s swing using a pareto frontier',
          ],
          [
            {
              text: 'Pitch physics study on seam shifted wake',
              url: 'https://www.youtube.com/watch?v=ZRKJbYRHmXw',
            },
            ' to maximize efficiency of pitches utilizing different seam orientations',
          ],
        ],
      },
      {
        text: [
          'Streamlined advance scouting reports and AI integration to provide matchup insights to pro level clients',
        ],
      },
      {
        text: [
          'Developed industry leading pitch models using a component based approach to isolate parts of the pitch into specific contributions',
        ],
        sub: [
          [
            'Stacking up against FanGraphs with an R² of over 0.75 across various pitch types and event specific qualifications',
          ],
        ],
      },
      {
        text: [
          'Refined skills and tools in Claude for our less technical employees to automate their workflows and save time on repeatable tasks',
        ],
      },
      {
        text: [
          'Built an end-to-end CV pipeline to ',
          {
            text: 'detect baseball seams',
            url: 'https://x.com/SamEhrlich/status/2017776969392525663',
          },
          ' from Edgertronic footage using CVAT/Roboflow for data annotation, SAM3 fine-tuned for segmentation, and optimizing the model using autoresearch and other techniques to improve mAP50-95',
        ],
      },
      {
        text: [
          'Built in-house BI Dashboard “Samcast” for our trainers saving $100k annually utilizing MongoDB, ClickHouse, FastAPI, and React',
        ],
        sub: [
          ['Collaborated with trainers to own and maintain a product used company-wide daily and shared across social media'],
          ['Used Karpathy’s Wiki LLM framework with gbrain to efficiently route context during development and debugging'],
        ],
      },
    ],
  },
  {
    org: 'University of Missouri Baseball, Columbia, MO',
    title: 'Data Analyst',
    dates: 'Aug 2022 - May 2023',
    bullets: [
      { text: ['Built numerous machine learning models to identify multiclass pitch types using XGBoost, KNN, and clustering methods'] },
      { text: ['Developed a custom Elo system to predict win probability of games and strength of teams at different points in the season'] },
      { text: ['Designed interactive dashboards using R Shiny to assist in driving decision making for our coaching staff on and off the field'] },
    ],
  },
];

export const RESUME_EDUCATION: { school: string; degrees: Degree[] } = {
  school: 'University of Missouri - Columbia, Missouri',
  degrees: [
    {
      degree: 'Master of Science in Data Science and Analytics',
      detail:
        'Major in High Performance Computing - GPA 3.93. Studies: Statistics, Visualization, Web Scraping, Data Mining, Database Design, Machine Learning, Cloud Computing',
      dates: 'Aug 2021 - May 2023',
    },
    {
      degree: 'Bachelor of Science in Parks, Recreation and Sport',
      detail:
        'Major in Sport Management, Minor in Hospitality Management - GPA 3.66 (Cum Laude, Dean’s List)',
      dates: 'Aug 2017 - May 2020',
    },
  ],
};

export const RESUME_PROJECTS: Bullet[] = [
  {
    text: [
      'Contributed to multiple Driveline research studies and wrote about them for the Driveline Blog (',
      { text: 'Bat Path', url: 'https://drivelinebaseball.com/blogs/blog/optimizing-bat-paths' },
      ', ',
      {
        text: 'Force Plates',
        url: 'https://drivelinebaseball.com/blogs/blog/forcing-rotation-exploring-lead-leg-force-curves-and-rotation-in-hitters',
      },
      ', ',
      {
        text: 'Command Study',
        url: 'https://drivelinebaseball.com/blogs/blog/the-interaction-of-biomechanics-and-command',
      },
      ')',
    ],
  },
  {
    text: [
      'Developed a ',
      { text: 'Twitter', url: 'https://x.com/SamEhrlich' },
      ' account to share research findings and engage with the analytics community through content creation and discussions',
    ],
    sub: [
      [
        'Built a community of over 1000 followers with posts featured on ',
        { text: 'Pitching Ninja', url: 'https://www.tiktok.com/@pitchingninja/video/7625681062009605389' },
        ' and ',
        { text: 'MLB', url: 'https://www.mlb.com/news/mlb-stats-to-trust-in-early-april' },
        ' with engagement over 1M',
      ],
    ],
  },
  {
    text: [
      { text: '“NCAA Tournament Sim”', url: 'https://samehrlich.github.io/NCAA_bid_predictions/' },
      ' Elo ranking model for NCAA D1 Baseball teams based on historical performances using data from 2021-2024',
    ],
    sub: [
      ['Successfully predicted 3 of the final 8 teams that made it to Omaha in the 2025 Men’s College World Series'],
      ['Generated NCAA tournament championship probability forecasts for all teams through Monte Carlo simulation of 20,000 brackets'],
    ],
  },
  {
    text: [
      { text: '“Stuff Model”', url: 'https://github.com/SamEhrlich/StuffModel6-24-24' },
      ' Pitching grade model that applies run values to a pitch solely on the movement profile, agnostic of location',
    ],
    sub: [
      ['Data cleaning, EDA using domain knowledge, research, clustering methods, and sampling techniques for imbalance classes'],
      ['Utilized XGBoosting paired with Optuna for hyperparameter tuning to generate predictions that best minimized the MSE'],
    ],
  },
];

export const RESUME_SKILLS: { label: string; body: RichText }[] = [
  {
    label: 'Languages and Software',
    body: [
      'SQL (PostgreSQL, MySQL, NoSQL, MongoDB, ClickHouse), R (RStudio, Shiny, Tidyverse, ggplot2, xgboost), Python (Pandas, NumPy, Matplotlib, Seaborn, Plotly, scikit-learn, BS4, cv2, ultralytics, mediapipe, FastAPI, Optuna), Cloud Computing (GCP, AWS), Applied AI (Claude, OpenAI, Gemini, MoonDream, SAM3, autoresearch), React, GitHub, Hugging Face, CVAT, Roboflow',
    ],
  },
  {
    label: 'Skills & Certs',
    body: [
      { text: 'Claude AI Fluency Certification', url: 'https://verify.skilljar.com/c/3mmgf4cazn6x' },
      ', Applied Machine Learning, Advanced Visualization, Parameter Tuning, Data Engineering, Bayesian and statistical modeling, Computer Vision (Object Detection, Segmentation, Image Classification, Visual Tracking), Hyperparameter Optimization',
    ],
  },
];
