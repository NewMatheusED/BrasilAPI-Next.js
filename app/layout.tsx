import type { Metadata } from "next";
import SideNav from "./ui/sideNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brasil API",
  description: "Brasil API with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex">
          <SideNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
