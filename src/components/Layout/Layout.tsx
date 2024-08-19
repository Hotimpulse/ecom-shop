import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import layout from "./layout.module.scss";

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
      <div className={layout.wrapper}>
        <Header />
        <main className={layout.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
