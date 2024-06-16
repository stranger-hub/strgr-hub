import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Auth | Stranger Hub',
  description: 'Auth form for Stranger Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex justify-center items-center h-[100vh]">
          {children}
        </div>
      </body>
    </html>
  )
}
