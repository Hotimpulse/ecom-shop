import { Link, NavLink } from "react-router-dom";
import header from "../Header/header.module.scss";
import CartComponent from "../Header/CartComponent";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";

interface INavigation {
  mobile: string;
  onClick?: () => void;
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
          <Link
            to="/#catalog"
            className={header.nav_item}
            onClick={useHandleAnchorClick("#catalog")}
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link
            to="/#faq"
            className={header.nav_item}
            onClick={useHandleAnchorClick("#faq")}
          >
            FAQ
          </Link>
        </li>
        <li>
          <NavLink to="/cart">
            <div className={header.cart_wrapper}>
              <CartComponent />
            </div>
          </NavLink>
        </li>
        <li>
          <Link
            to="/"
            className={header.nav_item}
            onClick={useHandleAnchorClick("#")}
          >
            Johnson Smith
          </Link>
        </li>
      </ul>
    </nav>
  );
}
