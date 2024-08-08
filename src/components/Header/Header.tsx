import { useState } from "react";
import header from "./header.module.scss";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={header.wrapper}>
      <div className={header["wrapper-menu"]}>
        <a href="#" className={header.header} onClick={useHandleAnchorClick}>
          Goods4you
        </a>
        {menuOpen ? (
          <div
            className={header.burger_veil + (menuOpen ? ` ${header.open}` : "")}
          >
            <Navigation mobile={"mobile"} />
          </div>
        ) : (
          <Navigation mobile={"pc"} />
        )}
      </div>
      <div
        className={header.burger_menu + (menuOpen ? ` ${header.open}` : "")}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
