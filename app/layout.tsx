import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fira_Code,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Source_Code_Pro,
} from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snippix — Code Card Generator",
  description: "Turn code into beautiful shareable cards",
  openGraph: {
    title: "Snippix — Code Card Generator",
    description: "Turn code into beautiful shareable cards",
    url: "https://snippix-app.vercel.app",
    siteName: "Snippix",
    images: [
      {
        url: "https://snippix-app.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snippix — Code Card Generator",
    description: "Turn code into beautiful shareable cards",
    images: ["https://snippix-app.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${firaCode.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
