import { NavLink } from "react-router-dom";
import footer from "./footer.module.scss";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";

export default function Footer() {
  return (
    <footer className={footer.wrapper}>
      <div className={footer["wrapper-menu"]}>
        <NavLink to="/#" className={footer.footer}>
          Goods4you
        </NavLink>
        <nav className={footer.navigation}>
          <ul className={footer.nav_list}>
            <li>
              <NavLink
                to="/#catalog"
                className={footer.nav_item}
                onClick={useHandleAnchorClick("#catalog")}
              >
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#faq"
                className={footer.nav_item}
                onClick={useHandleAnchorClick("#faq")}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
