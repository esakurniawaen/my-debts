import { type AppType } from "next/dist/shared/lib/utils";
import { Tooltip } from "react-tooltip";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Tooltip positionStrategy="fixed" delayShow={3000} id="tooltip" />
    </>
  );
};

export default MyApp;
