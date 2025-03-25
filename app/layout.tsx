import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/components/providers";

const openSans = Open_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "DendriteSoft AI Image Editor",
  description: "Transform your images with our advanced AI-powered editor. Enhance, edit, and create stunning visuals effortlessly.",
  keywords: ["AI image editor", "photo editing", "image enhancement", "AI art", "creative tools", "online image editor"],
  authors: [{ name: "DendriteSoft" }],
  openGraph: {
    type: "website",
    url: "https://www.dendritesoft.com",
    title: "DendriteSoft AI Image Editor",
    description: "Experience the future of image editing with our AI-powered tools. Edit, enhance, and create stunning images with ease.",
    images: [
      {
        url: "https://www.dendritesoft.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "DendriteSoft AI Image Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DendriteSoft AI Image Editor",
    description: "Transform your images with our advanced AI-powered editor. Enhance, edit, and create stunning visuals effortlessly.",
    images: ["https://www.dendritesoft.com/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Transform your images with our advanced AI-powered editor. Enhance, edit, and create stunning visuals effortlessly." />
        <meta name="keywords" content="AI image editor, photo editing, image enhancement, AI art, creative tools, online image editor" />
        <meta name="author" content="DendriteSoft" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dendritesoft.com" />
        <meta property="og:title" content="DendriteSoft AI Image Editor" />
        <meta property="og:description" content="Experience the future of image editing with our AI-powered tools. Edit, enhance, and create stunning images with ease." />
        <meta property="og:image" content="https://www.dendritesoft.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DendriteSoft AI Image Editor" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DendriteSoft AI Image Editor" />
        <meta name="twitter:description" content="Transform your images with our advanced AI-powered editor. Enhance, edit, and create stunning visuals effortlessly." />
        <meta name="twitter:image" content="https://www.dendritesoft.com/og-image.png" />
        <link rel="icon" href="/globe.svg" />
        <link rel="canonical" href="https://www.dendritesoft.com" />
        <title>DendriteSoft&apos;s AI Image Editor</title>
      </head>
      <body
        className={`${openSans.className} antialiased bg-white dark:bg-slate-950`}
        suppressHydrationWarning
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
