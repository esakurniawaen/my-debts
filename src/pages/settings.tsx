import type { NextPage } from "next";
import Head from "next/head";

import SettingsScreen from "~/screens/settings";

const SettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings - Debt Manager</title>
      </Head>

      <SettingsScreen />
    </>
  );
};

export default SettingsPage;
