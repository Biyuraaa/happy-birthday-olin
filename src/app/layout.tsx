import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";

// Main fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Decorative fonts for romantic content
const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Configure viewport settings
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ec4899" },
    { media: "(prefers-color-scheme: dark)", color: "#be185d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Enhanced metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Happy Birthday Olin",
    default: "Happy Birthday Olin",
  },
  description: "A special birthday celebration made with love for Olin",
  keywords: [
    "birthday",
    "celebration",
    "love",
    "Olin",
    "surprise",
    "memories",
    "anniversary",
  ],
  authors: [{ name: "Bimo", url: "https://github.com/yourusername" }],
  creator: "Bimo",
  publisher: "Bimo",
  openGraph: {
    title: "Happy Birthday Olin",
    description: "A beautiful birthday message filled with love and memories",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Birthday Olin",
      },
    ],
    type: "website",
    locale: "id_ID",
    siteName: "Happy Birthday Olin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Olin",
    description: "A beautiful birthday message filled with love and memories",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${playfair.variable} font-sans antialiased bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900 min-h-screen text-white`}
      >
        {/* Background music (optional) */}
        <audio autoPlay loop id="background-music" className="hidden">
          <source src="/music/anugrah_terindah.mp3" type="audio/mpeg" />
        </audio>

        {/* Canvas for confetti on page load */}
        <div
          id="confetti-container"
          className="fixed inset-0 pointer-events-none z-50"
        ></div>

        {/* Main content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
