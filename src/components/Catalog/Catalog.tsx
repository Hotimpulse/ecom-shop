import DefaultButton from "@src/ui/Buttons/DefaultButton";
import catalog from "./catalog.module.scss";
import ItemCard from "../ItemCard/ItemCard";

export default function Catalog() {
  return (
    <div className={catalog.catalog_wrapper}>
      <div className={catalog.catalog_container}>
        <a href="#catalog" className={catalog.catalog_header}>
          <span>Catalog</span>
        </a>
        <input
          type="text"
          placeholder="Search by title"
          className={catalog.catalog_search}
        />

        <div className={catalog.catalog_grid_container}>
          <div className={catalog.catalog_grid}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((item) => (
              <div key={item}>{<ItemCard />}</div>
            ))}
          </div>
          <DefaultButton children={"Show more"} />
        </div>
      </div>
    </div>
  );
}
