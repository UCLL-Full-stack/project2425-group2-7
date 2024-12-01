import {AppProps} from "next/app";
import "../styles/globals.css";
import "styles/header.css";
import "styles/popUp.css";
import "@styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

