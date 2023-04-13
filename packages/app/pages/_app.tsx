import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppType } from 'next/app';
import React from 'react';
import i18NextConfig from '../next-i18next.config';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...{ ...pageProps, locale: 'en' }} />;
};

export default appWithTranslation(MyApp, i18NextConfig);
