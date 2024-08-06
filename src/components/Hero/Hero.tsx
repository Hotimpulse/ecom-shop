import DefaultButton from "@src/ui/Buttons/DefaultButton";
import hero from "./hero.module.css";

export default function Hero() {
  return (
    <div className={hero.hero}>
      <h1 className={hero.title}>
        Any products from famous brands with worldwide delivery
      </h1>
      <p>
        We sell smartphones, laptops, clothes, shoes and many other products at
        low prices
      </p>
      <DefaultButton children={"Go to shopping"} />
    </div>
  );
}
