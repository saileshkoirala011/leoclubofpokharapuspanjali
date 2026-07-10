import type { Metadata } from "next";
import "./globals.css";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
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
      <body>
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
