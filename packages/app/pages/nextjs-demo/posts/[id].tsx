import Head from 'next/head';
import React from 'react';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../components/layout';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';
import utilStyles from '../../../styles/utils.module.css';
import { getServerTranslations } from '../../../lib/getServerTranslations';

// Note: [...id].tsx would be a catch all for /posts/a/b/c
// In that case, return the id as an array of folder names ['a', 'b', 'c']

//
// Dev: Runs on every page load
// Prod: Runs at build time
//
export async function getStaticProps({
  params,
  locale,
}: {
  params: { id: string };
  locale: string;
}): Promise<{ props: { postData: unknown; locale: string } }> {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      locale,
      ...(await getServerTranslations(locale, ['common'])),
    },
  };
}

//
// Dev: Runs on every page load
// Prod: Runs at build time
//
export async function getStaticPaths(props) {
  const paths = getAllPostIds();
  const result = {
    paths: [
      ...props.locales.flatMap((locale) =>
        paths.map((path) => ({ params: { id: path.params.id }, locale })),
      ),
    ],
    fallback: false, // Used to set handling for non-existing paths
  };
  return result;
}

export default function Post({ postData, locale }): JSX.Element {
  return (
    <Layout locale={locale}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
