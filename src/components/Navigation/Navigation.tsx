import { NavLink } from "react-router-dom";
import header from "../Header/header.module.scss";
import CartComponent from "../Header/CartComponent";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";

interface INavigation {
  mobile: string;
}

export default function Navigation({ mobile }: INavigation) {
  return (
    <nav className={header.navigation}>
      <ul
        className={
          mobile === "mobile" ? header.nav_list_mobile : header.nav_list
        }
      >
        <li>
          <a
            href="#catalog"
            className={header.nav_item}
            onClick={useHandleAnchorClick}
          >
            Catalog
          </a>
        </li>
        <li>
          <a
            href="#faq"
            className={header.nav_item}
            onClick={useHandleAnchorClick}
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
            onClick={useHandleAnchorClick}
          >
            Johnson Smith
          </a>
        </li>
      </ul>
    </nav>
  );
}
