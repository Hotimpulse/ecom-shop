import Hero from "@src/components/Hero/Hero";
import home from "./home.module.css";

export default function Home() {
  return (
    <div className={home.home_container}>
      <Hero />
    </div>
  );
}
