import { ConfigApp } from "@/config/app.config";
import ClientRootProvider from "./_rootProviders";
import "../styles/globals.css";
import Head from "next/head";

export async function generateMetadata() {
  return {
    title: `${ConfigApp?.nameApp}`,
    description: ConfigApp?.description,
    openGraph: {
      url: ConfigApp?.appUrl,
      title: `${ConfigApp?.nameApp}`,
      description: ConfigApp?.description,
      images: [
        {
          url: ConfigApp?.appUrl + "/assets/logo.png",
          width: 800,
          height: 600,
          alt: "Logo",
        },
      ],
      siteName: ConfigApp?.nameApp,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta httpEquiv="Content-Language" content="pt-br" />
        <meta name="google" content="notranslate" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <ClientRootProvider>{children}</ClientRootProvider>
      </body>
    </html>
  );
}
