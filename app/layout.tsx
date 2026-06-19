import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider"; // Import the provider!

export const metadata: Metadata = {
  title: "Productivity Pet",
  description: "Level up your life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen font-sans flex antialiased">
        
        {/* Wrapping inside the */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Start in dark mode by default!
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />

          <main className="flex-1 h-screen overflow-y-auto">
            <div className="max-w-5xl mx-auto p-8">
              {children}
            </div>
          </main>
        </ThemeProvider>

      </body>
    </html>
  );
}