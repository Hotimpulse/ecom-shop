import { useDispatch } from "react-redux";
import catalog from "../Catalog/catalog.module.scss";
import { AppDispatch } from "@src/store/store";
import { setInput } from "@src/store/products/productsSlice";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();

  function handleSearch(query: string): void {
    dispatch(setInput(query));
  }
  
  return (
    <input
      type="text"
      placeholder="Search by title"
      className={catalog.catalog_search}
      onChange={(e) => handleSearch(e.currentTarget.value)}
    />
  );
}
