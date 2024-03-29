import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import getConfig from 'next/config';
import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

export const siteTitle = 'PwrDrvr - Next.js Demo';

const name = 'PwrDrvr';
export default function Layout(context: {
  children: React.ReactNode;
  home?: boolean;
  locale: string;
}): JSX.Element {
  const { children, home = undefined } = context;
  const base = getConfig().publicRuntimeConfig.staticFolder;
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href={`${base}/favicon.ico`} />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src={`${base}/images/profile.jpg`}
              unoptimized
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/nextjs-demo">
              <Image
                priority
                src={`${base}/images/profile.jpg`}
                unoptimized
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href={`/${context.locale}/nextjs-demo`} className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={`/nextjs-demo`}>{`← ${t('back-to-home')}`}</Link>
        </div>
      )}
    </div>
  );
}
