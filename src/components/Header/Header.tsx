import CartComponent from "./CartComponent";
import header from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleAnchorClick(): void {
    navigate("/");
    setTimeout(() => {
      const element = document.querySelector("hash");
      if (element) {
        element.scrollIntoView();
      }
    }, 0);
  }

  return (
    <header className={header.wrapper}>
      <div className={header["wrapper-menu"]}>
        <a href="#" className={header.header} onClick={handleAnchorClick}>
          Goods4you
        </a>
        <nav className={header.navigation}>
          <ul className={header.nav_list}>
            <li>
              <a
                href="#catalog"
                className={header.nav_item}
                onClick={handleAnchorClick}
              >
                Catalog
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className={header.nav_item}
                onClick={handleAnchorClick}
              >
                FAQ
              </a>
            </li>
            <li>
              <NavLink to="/cart">
                <div className={header.cart_wrapper}>
                  <CartComponent />
                </div>
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className={header.nav_item}
                onClick={handleAnchorClick}
              >
                Johnson Smith
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
