// File: src/app/layout.jsx (CORRECT AND FINAL CODE)
import "./globals.css";


export const metadata = {
  title: "CreatorVerse",
  description: "Your Entire Creator Business, in One Place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
    <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}