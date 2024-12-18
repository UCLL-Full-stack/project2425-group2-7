import {AppProps} from "next/app";
import "../styles/globals.css";
import "styles/header.css";
import "styles/popUp.css";
import "@styles/globals.css"
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(App);
