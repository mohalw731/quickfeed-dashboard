import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { ThemeProvider } from "../providers/ThemeProvider";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickFeed",
  description: "Analytics made easy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <my-widget project="41"></my-widget>
            <script src="https://quickfeedwidgetlight.netlify.app/widget.js"></script>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
