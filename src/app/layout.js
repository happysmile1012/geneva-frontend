// import { Geist, Geist_Mono } from "next/font/google";
import ThemeProviderWrapper from "./ThemeProvider";
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const goudy = localFont({
  src: [
    {
      path: '../../public/fonts/goudy-old-style-regular.ttf'
    }
  ],
  variable: '--font-goudy'
});

const aptos = localFont({
  src: [
    {
      path: '../../public/fonts/Aptos.ttf'
    },
    {
      path: '../../public/fonts/Aptos-Bold.ttf'
    }
  ],
  variable: '--font-aptos'
});


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Geneva",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${goudy.variable} ${aptos.variable}`} suppressHydrationWarning>
    <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <ThemeProviderWrapper>
          {children}
          <Toaster position="top-right" />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
