import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  title: "lf2",
  description: "Learn to finance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
