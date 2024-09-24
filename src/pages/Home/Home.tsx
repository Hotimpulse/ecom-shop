import Hero from "@src/components/Hero/Hero";
import Catalog from "@src/components/Catalog/Catalog";
import Faq from "@src/components/FAQ/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="catalog">
        <Catalog />
      </section>
      <section id="faq">
        <Faq />
      </section>
    </>
  );
}
