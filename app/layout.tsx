import type { Metadata } from "next";
import { Merriweather, Montserrat } from "next/font/google";
import { getSiteContent } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: "Shinro Manabi Academy",
    description: "Japanese language education and study pathway academy.",
    icons: {
      icon: content.siteIcon,
      shortcut: content.siteIcon,
      apple: content.siteIcon,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${merriweather.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
