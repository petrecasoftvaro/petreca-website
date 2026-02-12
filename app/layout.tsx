import "./global.css";
import type { Metadata } from "next";
import MainNavigation from "@/components/Layout/MainNavigation";
import { Auth0SWRConfig } from "@/components/providers/Auth0SWRConfig";

export const metadata: Metadata = {
  title: "Petreca's Blog",
  description: "Um blog sobre programação, tecnologia e desenvolvimento web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body>
        <Auth0SWRConfig>
          <div className="container mx-auto max-w-6xl px-4">
            <MainNavigation />
            <main className="mb-8 flex flex-col justify-center items-center w-full">
              {children}
            </main>
          </div>
        </Auth0SWRConfig>
      </body>
    </html>
  );
}