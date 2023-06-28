const defaultTheme = require('tailwindcss/defaultTheme');

const additionalColors = {
  'pink-salmon': {
    DEFAULT: '#FD92A5',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#FEE2E7',
    400: '#FEBAC6',
    500: '#FD92A5',
    600: '#FC5B78',
    700: '#FB244A',
    800: '#E3042C',
    900: '#AB0321',
    950: '#90031C',
  },
  'green-metal': {
    DEFAULT: '#747E40',
    50: '#CAD1A5',
    100: '#C2CA97',
    200: '#B2BC7C',
    300: '#A2AF61',
    400: '#8D994E',
    500: '#747E40',
    600: '#52592D',
    700: '#2F341A',
    800: '#0D0E07',
    900: '#000000',
    950: '#000000',
  },
  'energy-yellow': {
    DEFAULT: '#FAD44E',
    50: '#FFFFFF',
    100: '#FEFBED',
    200: '#FDF1C5',
    300: '#FCE79D',
    400: '#FBDE76',
    500: '#FAD44E',
    600: '#F8C717',
    700: '#D2A506',
    800: '#9B7A04',
    900: '#654F03',
    950: '#493A02',
  },
  'east-bay': {
    DEFAULT: '#3C5C7E',
    50: '#BCCDDF',
    100: '#AEC2D8',
    200: '#92AECB',
    300: '#7699BE',
    400: '#5B84B1',
    500: '#49709A',
    600: '#3C5C7E',
    700: '#2A4058',
    800: '#182532',
    900: '#06090C',
    950: '#000000',
  },
  'brick-red': {
    DEFAULT: '#CC294B',
    50: '#F1BBC7',
    100: '#EEAAB8',
    200: '#E7889C',
    300: '#E06680',
    400: '#D94463',
    500: '#CC294B',
    600: '#9D203A',
    700: '#6F1629',
    800: '#400D17',
    900: '#110306',
    950: '#000000',
  },
  coral: {
    DEFAULT: '#FD8649',
    50: '#FFFFFF',
    100: '#FFF1EA',
    200: '#FED6C2',
    300: '#FEBC9A',
    400: '#FDA171',
    500: '#FD8649',
    600: '#FC6112',
    700: '#D34902',
    800: '#9C3602',
    900: '#642301',
    950: '#491901',
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontSize: defaultTheme.fontSize,
    extend: {
      fontFamily: {
        serif: ['var(--font-crimson)', ...defaultTheme.fontFamily.serif],
        rampart: ['var(--font-rampart)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...additionalColors,
        primary: additionalColors['brick-red'],
      },

      // fontSize: {
      //   xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      //   sm: ['0.875rem', { lineHeight: '1.5rem' }],
      //   base: ['1rem', { lineHeight: '1.75rem' }],
      //   lg: ['1.125rem', { lineHeight: '1.75rem' }],
      //   xl: ['1.25rem', { lineHeight: '2rem' }],
      //   '2xl': ['1.5rem', { lineHeight: '2rem' }],
      //   '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      //   '4xl': ['2rem', { lineHeight: '2.5rem' }],
      //   '5xl': ['3rem', { lineHeight: '3.5rem' }],
      //   '6xl': ['3.75rem', { lineHeight: '1' }],
      //   '7xl': ['4.5rem', { lineHeight: '1' }],
      //   '8xl': ['6rem', { lineHeight: '1' }],
      //   '9xl': ['8rem', { lineHeight: '1' }],
      // },
      typography: (theme) => {
        return {
          invert: {
            css: {
              '--tw-prose-body': 'var(--tw-prose-invert-body)',
              '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
              '--tw-prose-links': 'var(--tw-prose-invert-links)',
              '--tw-prose-links-hover': 'var(--tw-prose-invert-links-hover)',
              '--tw-prose-underline': 'var(--tw-prose-invert-underline)',
              '--tw-prose-underline-hover':
                'var(--tw-prose-invert-underline-hover)',
              '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
              '--tw-prose-counters': 'var(--tw-prose-invert-counters)',
              '--tw-prose-bullets': 'var(--tw-prose-invert-bullets)',
              '--tw-prose-hr': 'var(--tw-prose-invert-hr)',
              '--tw-prose-quote-borders':
                'var(--tw-prose-invert-quote-borders)',
              '--tw-prose-captions': 'var(--tw-prose-invert-captions)',
              '--tw-prose-code': 'var(--tw-prose-invert-code)',
              '--tw-prose-code-bg': 'var(--tw-prose-invert-code-bg)',
              '--tw-prose-pre-code': 'var(--tw-prose-invert-pre-code)',
              '--tw-prose-pre-bg': 'var(--tw-prose-invert-pre-bg)',
              '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
              '--tw-prose-th-borders': 'var(--tw-prose-invert-th-borders)',
              '--tw-prose-td-borders': 'var(--tw-prose-invert-td-borders)',
            },
          },
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.stone.600'),
              '--tw-prose-headings': theme('colors.stone.900'),
              '--tw-prose-links': theme('colors.primary.500'),
              '--tw-prose-links-hover': theme('colors.primary.600'),
              '--tw-prose-underline': theme('colors.primary.500 / 0.2'),
              '--tw-prose-underline-hover': theme('colors.primary.500'),
              '--tw-prose-bold': theme('colors.stone.900'),
              '--tw-prose-counters': theme('colors.stone.900'),
              '--tw-prose-bullets': theme('colors.stone.900'),
              '--tw-prose-hr': theme('colors.stone.100'),
              '--tw-prose-quote-borders': theme('colors.stone.200'),
              '--tw-prose-captions': theme('colors.stone.400'),
              '--tw-prose-code': theme('colors.stone.700'),
              '--tw-prose-code-bg': theme('colors.stone.300 / 0.2'),
              '--tw-prose-pre-code': theme('colors.stone.100'),
              '--tw-prose-pre-bg': theme('colors.stone.900'),
              '--tw-prose-pre-border': 'transparent',
              '--tw-prose-th-borders': theme('colors.stone.200'),
              '--tw-prose-td-borders': theme('colors.stone.100'),

              '--tw-prose-invert-body': theme('colors.stone.400'),
              '--tw-prose-invert-headings': theme('colors.stone.200'),
              '--tw-prose-invert-links': theme('colors.primary.400'),
              '--tw-prose-invert-links-hover': theme('colors.primary.400'),
              '--tw-prose-invert-underline': theme('colors.primary.400 / 0.3'),
              '--tw-prose-invert-underline-hover': theme('colors.primary.400'),
              '--tw-prose-invert-bold': theme('colors.stone.200'),
              '--tw-prose-invert-counters': theme('colors.stone.200'),
              '--tw-prose-invert-bullets': theme('colors.stone.200'),
              '--tw-prose-invert-hr': theme('colors.stone.700 / 0.4'),
              '--tw-prose-invert-quote-borders': theme('colors.stone.500'),
              '--tw-prose-invert-captions': theme('colors.stone.500'),
              '--tw-prose-invert-code': theme('colors.stone.300'),
              '--tw-prose-invert-code-bg': theme('colors.stone.200 / 0.05'),
              '--tw-prose-invert-pre-code': theme('colors.stone.100'),
              '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 0.4)',
              '--tw-prose-invert-pre-border': theme('colors.stone.200 / 0.1'),
              '--tw-prose-invert-th-borders': theme('colors.stone.700'),
              '--tw-prose-invert-td-borders': theme('colors.stone.800'),

              // Base
              color: 'var(--tw-prose-body)',
              lineHeight: theme('lineHeight.7'),
              '> *': {
                marginTop: theme('spacing.10'),
                marginBottom: theme('spacing.10'),
              },
              p: {
                marginTop: theme('spacing.7'),
                marginBottom: theme('spacing.7'),
              },

              // Headings
              'h2, h3': {
                color: 'var(--tw-prose-headings)',
                fontWeight: theme('fontWeight.semibold'),
              },
              h2: {
                fontSize: theme('fontSize.xl')[0],
                lineHeight: theme('lineHeight.7'),
                marginTop: theme('spacing.20'),
                marginBottom: theme('spacing.4'),
              },
              h3: {
                fontSize: theme('fontSize.base')[0],
                lineHeight: theme('lineHeight.7'),
                marginTop: theme('spacing.16'),
                marginBottom: theme('spacing.4'),
              },
              ':is(h2, h3) + *': {
                marginTop: 0,
              },

              // Images
              img: {
                borderRadius: theme('borderRadius.lg'),
              },

              // Inline elements
              a: {
                color: 'var(--tw-prose-links)',
                fontWeight: theme('fontWeight.semibold'),
                textDecoration: 'underline',
                textDecorationColor: 'var(--tw-prose-underline)',
                transitionProperty: 'color, text-decoration-color',
                transitionDuration: theme('transitionDuration.150'),
                transitionTimingFunction: theme(
                  'transitionTimingFunction.in-out'
                ),
              },
              'a:hover': {
                color: 'var(--tw-prose-links-hover)',
                textDecorationColor: 'var(--tw-prose-underline-hover)',
              },
              strong: {
                color: 'var(--tw-prose-bold)',
                fontWeight: theme('fontWeight.semibold'),
              },
              code: {
                display: 'inline-block',
                color: 'var(--tw-prose-code)',
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.semibold'),
                backgroundColor: 'var(--tw-prose-code-bg)',
                borderRadius: theme('borderRadius.lg'),
                paddingLeft: theme('spacing.1'),
                paddingRight: theme('spacing.1'),
              },
              'a code': {
                color: 'inherit',
              },
              ':is(h2, h3) code': {
                fontWeight: theme('fontWeight.bold'),
              },

              // Quotes
              blockquote: {
                paddingLeft: theme('spacing.6'),
                borderLeftWidth: theme('borderWidth.2'),
                borderLeftColor: 'var(--tw-prose-quote-borders)',
                fontStyle: 'italic',
              },

              // Figures
              figcaption: {
                color: 'var(--tw-prose-captions)',
                fontSize: theme('fontSize.sm')[0],
                lineHeight: theme('lineHeight.6'),
                marginTop: theme('spacing.3'),
              },
              'figcaption > p': {
                margin: 0,
              },

              // Lists
              ul: {
                listStyleType: 'disc',
              },
              ol: {
                listStyleType: 'decimal',
              },
              'ul, ol': {
                paddingLeft: theme('spacing.6'),
              },
              li: {
                marginTop: theme('spacing.6'),
                marginBottom: theme('spacing.6'),
                paddingLeft: theme('spacing[3.5]'),
              },
              'li::marker': {
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.semibold'),
              },
              'ol > li::marker': {
                color: 'var(--tw-prose-counters)',
              },
              'ul > li::marker': {
                color: 'var(--tw-prose-bullets)',
              },
              'li :is(ol, ul)': {
                marginTop: theme('spacing.4'),
                marginBottom: theme('spacing.4'),
              },
              'li :is(li, p)': {
                marginTop: theme('spacing.3'),
                marginBottom: theme('spacing.3'),
              },

              // Code blocks
              pre: {
                color: 'var(--tw-prose-pre-code)',
                fontSize: theme('fontSize.sm')[0],
                fontWeight: theme('fontWeight.medium'),
                backgroundColor: 'var(--tw-prose-pre-bg)',
                borderRadius: theme('borderRadius.lg'),
                padding: theme('spacing.8'),
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'var(--tw-prose-pre-border)',
              },
              'pre code': {
                display: 'inline',
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                backgroundColor: 'transparent',
                borderRadius: 0,
                padding: 0,
              },

              // Horizontal rules
              hr: {
                marginTop: theme('spacing.20'),
                marginBottom: theme('spacing.20'),
                borderTopWidth: '1px',
                borderColor: 'var(--tw-prose-hr)',
                '@screen lg': {
                  marginLeft: `calc(${theme('spacing.12')} * -1)`,
                  marginRight: `calc(${theme('spacing.12')} * -1)`,
                },
              },

              // Tables
              table: {
                width: '100%',
                tableLayout: 'auto',
                textAlign: 'left',
                fontSize: theme('fontSize.sm')[0],
              },
              thead: {
                borderBottomWidth: '1px',
                borderBottomColor: 'var(--tw-prose-th-borders)',
              },
              'thead th': {
                color: 'var(--tw-prose-headings)',
                fontWeight: theme('fontWeight.semibold'),
                verticalAlign: 'bottom',
                paddingBottom: theme('spacing.2'),
              },
              'thead th:not(:first-child)': {
                paddingLeft: theme('spacing.2'),
              },
              'thead th:not(:last-child)': {
                paddingRight: theme('spacing.2'),
              },
              'tbody tr': {
                borderBottomWidth: '1px',
                borderBottomColor: 'var(--tw-prose-td-borders)',
              },
              'tbody tr:last-child': {
                borderBottomWidth: 0,
              },
              'tbody td': {
                verticalAlign: 'baseline',
              },
              tfoot: {
                borderTopWidth: '1px',
                borderTopColor: 'var(--tw-prose-th-borders)',
              },
              'tfoot td': {
                verticalAlign: 'top',
              },
              ':is(tbody, tfoot) td': {
                paddingTop: theme('spacing.2'),
                paddingBottom: theme('spacing.2'),
              },
              ':is(tbody, tfoot) td:not(:first-child)': {
                paddingLeft: theme('spacing.2'),
              },
              ':is(tbody, tfoot) td:not(:last-child)': {
                paddingRight: theme('spacing.2'),
              },
            },
          },
        };
      },
    },
  },
};
