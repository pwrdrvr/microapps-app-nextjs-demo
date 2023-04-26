const path = require('path');

const backend = require('i18next-http-backend/cjs');

/**
 * @type {import('next-i18next/dist/types/types').UserConfig}
 */
const config = {
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sv'],
  },
  ns: ['common'],
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
  react: { useSuspense: false }, //this line
};

module.exports = config;
