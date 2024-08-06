import hero from "./hero.module.css";

export default function Hero() {
  return (
    <div className={hero.hero}>
      <h1 className={hero.title}>
        Any products from famous brands with worldwide delivery
      </h1>
    </div>
  );
}
