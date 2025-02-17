import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],  // Regular, Medium, SemiBold, Bold
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RexBot - WhatsApp Bot",
  description: "Bot WhatsApp pintar yang siap membantu aktivitas grup dan personal chat Anda",
  icons: {
    icon: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: ["/android-chrome-192x192.png"],
    other: [
      { rel: "icon", url: "/android-chrome-512x512.png" }
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RexBot"
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
