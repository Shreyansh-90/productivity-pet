import type { Metadata } from "next";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";

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
      <body className="bg-white text-slate-800 min-h-screen font-sans flex antialiased">
        

          <Sidebar />

          <main className="flex-1 h-screen overflow-y-auto">
            <div className="w-full pt-24 ">
              {children}
            </div>
          </main>


      </body>
    </html>
  );
}