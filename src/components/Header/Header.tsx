import CartComponent from "./CartComponent";
import header from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={header.wrapper}>
      <div className={header['wrapper-menu']}>
        <Link to="/">
          <a href="#" className={header.header}>
            Goods4you
          </a>
        </Link>
        <nav className={header.navigation}>
          <ul className={header.nav_list}>
            <Link to="/catalog">
              <a href="#" className={header.nav_list}>
                Catalog
              </a>
            </Link>
            <Link to="/faq">
              <a href="#" className={header.nav_list}>
                FAQ
              </a>
            </Link>
            <Link to="/cart">
              <div className={header.cart_wrapper}>
                <a href="#" className={header.nav_list}>
                  <CartComponent />
                </a>
              </div>
            </Link>
            <Link to="/">
              <a href="#" className={header.nav_list}>
                Johnson Smith
              </a>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
