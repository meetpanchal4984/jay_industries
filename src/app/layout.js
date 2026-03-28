import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';

export const metadata = {
  title: "company-website",
  description: "Company Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="app-container">
          <Navbar />
          {children}
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  );
}
