import CartComponent from "./CartComponent";
import header from "./header.module.css";

export default function Header() {
  return (
    <div className={header.wrapper}>
      <h1 className={header.header}>Goods4you</h1>
      <nav className={header.navigation}>
        <ul className={header.nav_list}>
          <li>Catalog</li>
          <li>FAQ</li>
          <CartComponent />
          <li>Johnson Smith</li>
        </ul>
      </nav>
    </div>
  );
}
