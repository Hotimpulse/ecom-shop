import CartComponent from "./CartComponent";
import header from "./header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={header.wrapper}>
      <div className={header["wrapper-menu"]}>
        <NavLink to="/">
          <a href="#" className={header.header}>
            Goods4you
          </a>
        </NavLink>
        <nav className={header.navigation}>
          <ul className={header.nav_list}>
            <a href="#catalog" className={header.nav_list}>
              Catalog
            </a>
            <a href="#faq" className={header.nav_list}>
              FAQ
            </a>
            <NavLink to="/cart">
              <div className={header.cart_wrapper}>
                <a href="#" className={header.nav_list}>
                  <CartComponent />
                </a>
              </div>
            </NavLink>
            <a href="#" className={header.nav_list}>
              Johnson Smith
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}
