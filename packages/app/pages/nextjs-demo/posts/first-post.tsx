import Head from 'next/head';
import Layout from '../../../components/layout';
import utilStyles from '../../../styles/utils.module.css';
import React from 'react';

export default function FirstPost(): JSX.Element {
  return (
    <>
      <Layout home>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>
      </Layout>
    </>
  );
}
