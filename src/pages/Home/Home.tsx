import Hero from "@src/components/Hero/Hero";
import home from "./home.module.css";
import Catalog from "@src/components/Catalog/Catalog";
import Faq from "@src/components/FAQ/Faq";

export default function Home() {
  return (
    <div className={home.home_container}>
      <Hero />
      <section id="catalog">
        <Catalog />
      </section>
      <section id="faq">
        <Faq />
      </section>
    </div>
  );
}
