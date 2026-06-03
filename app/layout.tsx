import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA FREE STEM Opportunities",
  description:
    "A public beta directory for verified free STEM programs, library events, volunteer hours, co-op, SHSM, and youth opportunities across the GTA.",
  icons: {
    icon: "/scientist.png",
    apple: "/scientist.png"
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const preference = localStorage.getItem("gta-stem-opportunities-theme") || "system";
                  const resolved = preference === "system"
                    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                    : preference;
                  document.documentElement.dataset.theme = resolved;
                  document.documentElement.dataset.themePreference = preference;
                } catch {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.dataset.themePreference = "system";
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
