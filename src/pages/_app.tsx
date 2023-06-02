import { type AppType } from "next/dist/shared/lib/utils";
import { Provider } from "jotai";
import { Tooltip } from "react-tooltip";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Component {...pageProps} />
      <Tooltip id="tooltip" />
    </Provider>
  );
};

export default MyApp;
