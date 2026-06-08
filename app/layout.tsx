import type { Metadata } from "next";
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
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
