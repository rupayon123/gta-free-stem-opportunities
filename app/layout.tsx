import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA FREE STEM Opportunities",
  description:
    "A public beta directory for verified free STEM programs, library events, volunteer hours, co-op, SHSM, and youth opportunities across the GTA.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const preference = localStorage.getItem("gta-stem-opportunities-theme") || "light";
                  const resolved = preference === "system"
                    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                    : preference;
                  document.documentElement.dataset.theme = resolved;
                  document.documentElement.dataset.themePreference = preference;
                } catch {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.dataset.themePreference = "light";
                }
              })();
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
