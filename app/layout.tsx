import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Notification from "@components/Notification";
import AuthSession from "@components/AuthSession";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
// export const revalidate = 0;
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ma Boutique",
  description: "ma boutique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSession>
      <html lang="en">
        <body
          className={`${inter.className} bg-green-50`}
          // si on veut couleur de backgroud sinon on laisse juste les crochets inter ...
          suppressHydrationWarning={true}
        >
          {children}
          <Analytics />
          <Notification />
        </body>
      </html>
    </AuthSession>
  );
}
