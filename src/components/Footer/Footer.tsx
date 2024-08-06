import footer from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={footer.wrapper}>
      <div className={footer["wrapper-menu"]}>
        <h1 className={footer.footer}>Goods4you</h1>
        <nav className={footer.navigation}>
          <ul className={footer.nav_list}>
            <li>Catalog</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
