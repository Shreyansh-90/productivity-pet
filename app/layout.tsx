import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"; // Import Next.js Link!

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
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 min-h-screen font-sans">
        
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b px-6 py-4 mb-8">
          <div className="max-w-2xl mx-auto flex gap-6 font-semibold">
            <Link href="/" className="text-slate-600 hover:text-blue-500 transition">
              🏠 Home
            </Link>
            <Link href="/profile" className="text-slate-600 hover:text-blue-500 transition">
              👤 Profile
            </Link>
            <Link href="/Shop" className="text-slate-600 hover:text-blue-500 transition">
              🛒 Shop
            </Link>
          </div>
        </nav>

        {/* Main Content Container */}
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* The 'children' prop is where your page.tsx content gets injected */}
            {children} 
          </div>
        </div>

      </body>
    </html>
  );
}