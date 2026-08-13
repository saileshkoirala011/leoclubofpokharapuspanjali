import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title:       "Leo Club of Pokhara Puspanjali | Lead. Serve. Inspire.",
  description: "A youth-driven community service organization committed to leadership development, humanitarian action, and positive change in Pokhara, Nepal.",
  keywords:    "Leo Club, Pokhara, Puspanjali, Nepal, youth, community service, leadership",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    siteName:    "Leo Club of Pokhara Puspanjali",
    title:       "Leo Club of Pokhara Puspanjali | Lead. Serve. Inspire.",
    description: "A youth-driven community service organization in Pokhara, Nepal.",
    images:      [{ url: "/images/logo.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Nunito+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
