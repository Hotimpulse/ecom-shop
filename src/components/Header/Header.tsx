import CartComponent from "./CartComponent";
import header from "./header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={header.wrapper}>
      <div className={header['wrapper-menu']}>
        <NavLink to="/">
          <a href="#" className={header.header}>
            Goods4you
          </a>
        </NavLink>
        <nav className={header.navigation}>
          <ul className={header.nav_list}>
            <NavLink to="/catalog">
              <a href="#" className={header.nav_list}>
                Catalog
              </a>
            </NavLink>
            <NavLink to="/faq">
              <a href="#" className={header.nav_list}>
                FAQ
              </a>
            </NavLink>
            <NavLink to="/cart">
              <div className={header.cart_wrapper}>
                <a href="#" className={header.nav_list}>
                  <CartComponent />
                </a>
              </div>
            </NavLink>
            <NavLink to="/">
              <a href="#" className={header.nav_list}>
                Johnson Smith
              </a>
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}
