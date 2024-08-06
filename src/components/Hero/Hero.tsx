import DefaultButton from "@src/ui/Buttons/DefaultButton";
import hero from "./hero.module.css";

export default function Hero() {
  return (
    <div className={hero.hero_section}>
      <div className={hero.hero_wrapper}>
        <div className={hero.hero_container}>
          <h1 className={hero.title}>
            Any products from famous brands with worldwide delivery
          </h1>
          <p className={hero.hero_text}>
            We sell smartphones, laptops, clothes, shoes and many other products
            at low prices
          </p>
          <DefaultButton children={"Go to shopping"} />
          <p className={hero.hero_back_text}>Goods4you</p>
        </div>
      </div>
    </div>
  );
}
