import type { NextPage } from "next";
import Head from "next/head";
import DebtScreen from "~/screens/debt/DebtScreen";

const DebtPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Debt - MyDebts</title>
      </Head>

      <DebtScreen />
    </>
  );
};

export default DebtPage;
