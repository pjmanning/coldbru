/**
 * Coldbru brand tokens
 * --------------------
 * Single source of truth for name, color, copy, and logo.
 */

export const brand = {
  /** Display name shown in header, footer, and document titles */
  name: 'Coldbru',

  /** Short tagline for the home hero */
  tagline: 'Flavored cold brew from the upstairs café.',

  /** Accent / primary brand color (CSS color) */
  color: {
    primary: '#c45c3e',
    primaryDark: '#8f3d28',
    accent: '#3d6b4f',
    background: '#f3ead9',
    surface: '#fff8ee',
    text: '#241910',
    muted: '#6b5748',
    border: '#e4d5c0',
  },

  /**
   * Logo slot — set `src` to a path under /public or an imported asset.
   * Leave null to render a text wordmark from `name`.
   */
  logo: {
    src: '/logo.svg',
    alt: 'Coldbru logo',
    width: 148,
    height: 36,
  },

  /** Home hero copy */
  hero: {
    headline: 'Second-floor café cold brew. Bottled, flavored, on subscription.',
    subhead:
      'Pandan coconut, palm sugar vanilla, sea salt caramel — the upstairs Bali shop energy, delivered weekly or monthly.',
    ctaLabel: 'Start a subscription',
    ctaHref: '/subscribe',
    secondaryLabel: 'Browse flavors',
    secondaryHref: '/flavors',
  },
};

/** CSS custom properties derived from brand tokens */
export function brandCssVars() {
  const {color} = brand;
  return {
    '--brand-primary': color.primary,
    '--brand-primary-dark': color.primaryDark,
    '--brand-accent': color.accent,
    '--brand-bg': color.background,
    '--brand-surface': color.surface,
    '--brand-text': color.text,
    '--brand-muted': color.muted,
    '--brand-border': color.border,
  };
}

/**
 * Compatibility helper used by Hydrogen product/home routes.
 * @returns {{storeName: string, tagline: string}}
 */
export function getTemplateConfig() {
  return {
    storeName: brand.name,
    tagline: brand.tagline,
  };
}
