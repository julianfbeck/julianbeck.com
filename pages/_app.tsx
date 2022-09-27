import "../styles/index.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../components/gtag";
import PlausibleProvider from "next-plausible";
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
  <PlausibleProvider domain="juli.sh" selfHosted customDomain="https://plausible.home.juli.sh" trackLocalhost enabled>
    <Component {...pageProps} />
  </PlausibleProvider>
  )
};

export default App;
