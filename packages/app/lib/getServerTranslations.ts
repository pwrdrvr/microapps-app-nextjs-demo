import type { Namespace } from 'i18next';
import type { SSRConfig, UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

export const getI18nPaths = () =>
  nextI18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

//
// Trick to fix server-side bundling 'can't find module packages/app/next-i18next.config.js'
// From: https://github.com/i18next/next-i18next/blob/master/TROUBLESHOOT.md#how-to-explicitly-pass-the-config
//

type ArrayElementOrSelf<T> = T extends Array<infer U> ? U[] : T[];

export const getServerTranslations = async (
  locale: string,
  namespacesRequired?: ArrayElementOrSelf<Namespace> | undefined,
  configOverride?: UserConfig,
  extraLocales?: string[] | false,
): Promise<SSRConfig> => {
  const config = configOverride ?? nextI18nextConfig;
  return serverSideTranslations(locale || 'en', namespacesRequired, config, extraLocales);
};
