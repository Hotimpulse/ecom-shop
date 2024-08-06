import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout(): JSX.Element {
  const { pathname } = useLocation();
  const pageName = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(1);

  return (
    <HelmetProvider>
      <Helmet title={`${pageName}`} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </HelmetProvider>
  );
}
