import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Provider from "./provider";
import "./globals.css";

// Load fonts properly
const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed
  variable: "--font-noto",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Metadata
export const metadata = {
  title: "Mentor-AI",
  description: "Your AI-Powered LMS",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${noto.variable} font-sans h-screen`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
