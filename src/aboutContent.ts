// All About-page copy lives here so the layout never has to be edited to change content.
//
// DRAFT mode shows a labelled placeholder for every empty slot, naming the export to fill
// in. Set DRAFT to false before publishing and empty slots disappear entirely, so a
// partially-filled page still looks finished.

import type { IconName } from './icons';

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
};

export const PROFILE = {
  name: 'Sam Ehrlich',
  /** One line under the name. */
  tagline: '',
  /** Import an image into src/assets/ and assign it here; falls back to initials when empty. */
  headshot: '',
  /** Brief career overview. One string per paragraph. */
  overview: [] as string[],
};

export const SOCIALS: Social[] = [
  { label: 'GitHub', url: 'https://github.com/SamEhrlich', icon: 'github' },
];

/** The longer story of getting into the field. One string per paragraph. */
export const JOURNEY: string[] = [];

export const MEDIA: Entry[] = [];

export const LAB: Entry[] = [];
