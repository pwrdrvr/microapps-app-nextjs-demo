import Head from 'next/head';
import React from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getSortedPostsData } from '../../lib/posts';
import Date from '../../components/date';

//
// getStaticProps runs server-side and is not included in the client-side
// code bundle at all.
//
// Dev: Runs on every page load
// Prod: Runs on build
//
// export async function getStaticProps(): Promise<
//   GetStaticPropsResult<{ allPostsData: ReturnType<typeof getSortedPostsData> }>
// > {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

//
// getServerSideProps - Runs on every page load.
// Used for server-side rendering with data accessed from server-side.
// TTFB will be delayed by duration of server-side calls for data.
//
// SWR - Next.js provided client side data reloader... suggested to use.
//

export async function getServerSideProps(context) {
  const allPostsData = getSortedPostsData();
  debugger;
  return {
    props: {
      allPostsData,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

export default function Home({ allPostsData }): JSX.Element {
  const { t } = useTranslation('common');
  return (
    // <Trans t={t}>
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{t('introduction')}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/nextjs-demo/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
    // </Trans>
  );
}
