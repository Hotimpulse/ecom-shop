import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout(): JSX.Element {
  const { pathname } = useLocation();
  const pageName = pathname.slice(1);
  const capitalizedName = capitalizeFirstLetter(pageName);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <HelmetProvider>
      <Helmet title={`${capitalizedName}`} />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}
      >
        <Header />
        <main style={{ flex: "1" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
