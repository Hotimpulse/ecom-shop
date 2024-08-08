import { useNavigate } from "react-router-dom";
import footer from "./footer.module.scss";

export default function Footer() {
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
    <footer className={footer.wrapper}>
      <div className={footer["wrapper-menu"]}>
        <a href="#" className={footer.footer} onClick={handleAnchorClick}>
          Goods4you
        </a>
        <nav className={footer.navigation}>
          <ul className={footer.nav_list}>
            <li>
              <a
                href="#catalog"
                className={footer.nav_item}
                onClick={handleAnchorClick}
              >
                Catalog
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className={footer.nav_item}
                onClick={handleAnchorClick}
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
