import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Cursor } from "./components/Cursor";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jakarta",
  display: "swap",
});

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
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
