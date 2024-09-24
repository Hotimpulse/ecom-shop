import { useDispatch } from "react-redux";
import catalog from "../Catalog/catalog.module.scss";
import { AppDispatch } from "@src/store/store";
import { setInput } from "@src/store/products/productsSlice";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const savedQuery = localStorage.getItem("query") || query;
    setQuery(savedQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(query: string): void {
    localStorage.setItem("query", query);
    dispatch(setInput(query));
    setQuery(query);
  }

  return (
    <input
      type="text"
      placeholder="Search by title"
      className={catalog.catalog_search}
      onChange={(e) => handleSearch(e.currentTarget.value)}
      value={query}
    />
  );
}
