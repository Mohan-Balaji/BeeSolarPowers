import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>BEE SOLAR POWERS | Authorized Distributor of Loom Solar Pvt Ltd</title>
      <meta name="description" content="BEE SOLAR POWERS - Your trusted partner for solar energy solutions. Authorized distributor of Loom Solar products. Installation, maintenance and solar energy systems for homes and businesses." />
    </Helmet>
    <App />
  </HelmetProvider>
);
