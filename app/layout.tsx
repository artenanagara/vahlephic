import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Cursor } from "./components/Cursor";

export const metadata: Metadata = {
  title: "Rizal Vahlevi",
  description:
    "Product Designer specializing in design storytelling and stakeholder alignment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeScript = `
    (function() {
      try {
        const stored = window.localStorage.getItem("theme");
        const theme = stored === "dark" ? "dark" : "light";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (_) {}
    })();
  `;

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
