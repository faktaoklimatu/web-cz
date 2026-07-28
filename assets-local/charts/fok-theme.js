/**
 * fok-theme.js — FoK chart cosmetics layer
 *
 * THE single source of truth for all visual values.
 * Swap this object to rebrand every chart at once.
 * Chart bones (scales, axes, data encoding) must never hardcode any value from here.
 */

const FoKTheme = {
  colors: {
    primary:   '#0050ae',
    accent:    '#1a88ff',
    grey:      '#53616e',
    lightGrey: '#9ba5ad',
    gridLine:  '#e8eef6',
    text:      '#3a3a45',

    // Categorical palette — sector order: energetika, průmysl, doprava, budovy, zemědělství, odpady, ostatní
    categorical: [
      '#f4465b', // energetika
      '#3b3b93', // průmysl
      '#8546af', // doprava
      '#0d80d8', // budovy
      '#00aa95', // zemědělství
      '#fab519', // odpady
      '#b5b8bd', // ostatní
    ],

    // Named sector colors for explicit lookup
    sectors: {
      energetika:  '#f4465b',
      prumysl:     '#3b3b93',
      doprava:     '#8546af',
      budovy:      '#0d80d8',
      zemedelstvi: '#00aa95',
      odpady:      '#fab519',
      ostatni:     '#b5b8bd',
    },

    // Sequential for temperature anomaly (cold → neutral → warm)
    sequential: {
      cold:    '#1a88ff',
      neutral: '#f7f7f7',
      warm:    '#c65163',
    },

    // Semantic
    positive: '#5db16f',
    negative: '#c65163',
    neutral:  '#9ba5ad',
  },

  font:      '"Roboto", system-ui, sans-serif',
  fontTitle: '"Inter", system-ui, sans-serif',

  fontSize: {
    title:      16,
    subtitle:   13,
    axisLabel:  12,
    annotation: 11,
    tooltip:    12,
  },

  fontWeight: {
    normal:     400,
    bold:       700,  // Inter Bold
    titleBold:  700,
  },

  margins: {
    top:    24,
    right:  20,
    bottom: 40,
    left:   52,
  },

  axis: {
    tickSize:    4,
    tickPadding: 12,
    tickColor:   '#9ba5ad',
    gridColor:   '#e8eef6',
    lineColor:   '#9ba5ad',
  },

  bar: {
    radius:  0,   // px, border-radius on bar tops
    padding: 0.2, // band scale inner padding (0–1)
  },

  line: {
    strokeWidth:      2,
    dotRadius:        3,
    dotRadiusHovered: 5,
  },

  tooltip: {
    background: '#fff',
    border:     '1px solid #e8eef6',
    borderRadius: 4,
    shadow:     '0 2px 8px rgba(0,0,0,0.10)',
    padding:    '8px 12px',
  },

  animation: {
    duration: 400,  // ms
    ease:     'easeCubicOut',
  },
};
