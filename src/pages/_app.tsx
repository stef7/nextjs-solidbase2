import type { AppProps } from "next/app";

import "@/style/globals.css";

export default function App({ Component: PageComponent, pageProps }: AppProps) {
  return <PageComponent {...pageProps} />;
}
