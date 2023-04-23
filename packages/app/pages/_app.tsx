import '../styles/globals.css';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppType } from 'next/app';
import React from 'react';
import i18NextConfig from '../next-i18next.config';

const MyApp: AppType = ({ Component, pageProps }) => {
  const { i18n } = useTranslation();
  return <Component {...{ ...pageProps, locale: i18n.language }} />;
};

export default appWithTranslation(MyApp, i18NextConfig);
