import { NextPage } from 'next';
import Head from 'next/head';

const PageNotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found - Debt Manager</title>
      </Head>

      <div className="grid place-items-center rounded-lg py-3 px-4 shadow-lg">
        <h1 className="font-sans text-lg text-red">Error 404</h1>
        <p className="text-center">Page not found</p>
      </div>
    </>
  );
};

export default PageNotFound;
