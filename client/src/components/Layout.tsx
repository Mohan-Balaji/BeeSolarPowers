import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>BEE SOLAR POWERS | Authorized Distributor of Loom Solar Pvt Ltd</title>
        <meta name="description" content="BEE SOLAR POWERS - Your trusted partner for solar energy solutions. Authorized distributor of Loom Solar products. Installation, maintenance and solar energy systems for homes and businesses." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Layout;
