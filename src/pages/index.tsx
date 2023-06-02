import type { NextPage } from "next";
import Head from "next/head";
import DebtsScreen from "~/screens/debts";

const DebtsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Debts - MyDebts</title>
      </Head>

      <DebtsScreen />
    </>
  );
};

export default DebtsPage;
